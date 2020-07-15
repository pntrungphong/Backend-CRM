import { HttpException, HttpStatus } from '@nestjs/common';
import { AbstractRepository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';

import { PageMetaDto } from '../../../../common/dto/PageMetaDto';
import { FileDto } from '../../../../modules/file/dto/fileDto';
import { TouchPointsPageDto } from '../../..//lead/dto/touchpoint/TouchPointsPageDto';
import { FileEntity } from '../../../file/file.entity';
import { InfoFileTouchPointDto } from '../../../lead/dto/touchpoint/infoFileTouchPointDto';
import { InfoLeadTouchPointDto } from '../../../lead/dto/touchpoint/InfoLeadTouchPointDto';
import { TouchPointDto } from '../../../lead/dto/touchpoint/TouchPointDto';
import { TouchPointsPagesOptionsDto } from '../../../lead/dto/touchpoint/TouchPointsPagesOptionsDto';
import { TouchPointFileEntity } from '../../../lead/entity/Touchpoint_file/fileTouchPoint.entity';
import { UserEntity } from '../../../user/user.entity';
import { UpdateTouchPointDto } from '../../dto/touchpoint/UpdateTouchPointDto';
import { TouchPointEntity } from '../../entity/Touchpoint/touchpoint.entity';

@EntityRepository(TouchPointEntity)
export class TouchPointRepository extends AbstractRepository<TouchPointEntity> {
    public async create(
        user: UserEntity,
        touchPointDto: UpdateTouchPointDto,
    ): Promise<TouchPointEntity> {
        const touchPointEntity = this.repository.create({
            ...touchPointDto,
            createdBy: user.id,
            updatedBy: user.id,
        });
        const newTpuchPoint = await this.repository.save(touchPointEntity);
        return newTpuchPoint.toDto() as TouchPointEntity;
    }
    public async getList(
        pageOptionsDto: TouchPointsPagesOptionsDto,
    ): Promise<TouchPointsPageDto> {
        const queryBuilder = this.repository
            .createQueryBuilder('touchpoint')
            .leftJoinAndSelect('touchpoint.lead', 'lead')
            .leftJoinAndSelect('touchpoint.fileTouchPoint', 'fileTouchPoint')
            .leftJoinAndSelect('fileTouchPoint.file', 'file')
            .addOrderBy('touchpoint.createdAt', pageOptionsDto.order);
        const [touchPoints, touchPointsCount] = await queryBuilder
            .skip(pageOptionsDto.skip)
            .take(pageOptionsDto.take)
            .getManyAndCount();
        const pageMetaDto = new PageMetaDto({
            pageOptionsDto,
            itemCount: touchPointsCount,
        });
        const result = [];
        touchPoints.forEach((element) => {
            const touchpoint = new TouchPointDto(element);
            touchpoint.lead = new InfoLeadTouchPointDto(element.lead);
            const file = touchpoint.fileTouchPoint;
            const listFile = [] as InfoFileTouchPointDto[];
            file.forEach((item) => {
                const infoFile = new InfoFileTouchPointDto(
                    item as TouchPointFileEntity,
                );
                const infoDetailFile = new FileDto(infoFile.file as FileEntity);
                infoFile.file = infoDetailFile;
                listFile.push(infoFile);
            });
            touchpoint.fileTouchPoint = listFile;
            result.push(touchpoint);
        });
        return new TouchPointsPageDto(result, pageMetaDto);
    }

    public async getLeadById(id: string): Promise<TouchPointDto> {
        const touchPointInfo = await this.repository.findOne({
            where: { id },
            relations: ['fileTouchPoint.file', 'fileTouchPoint', 'lead'],
        });
        const touchpoint = new TouchPointDto(touchPointInfo);
        touchpoint.lead = new InfoLeadTouchPointDto(touchPointInfo.lead);
        const file = touchpoint.fileTouchPoint;
        const listFile = [] as InfoFileTouchPointDto[];
        file.forEach((item) => {
            const infoFile = new InfoFileTouchPointDto(
                item as TouchPointFileEntity,
            );
            const infoDetailFile = new FileDto(infoFile.file as FileEntity);
            infoFile.file = infoDetailFile;
            listFile.push(infoFile);
            touchpoint.fileTouchPoint = listFile;
        });
        return touchpoint;
    }

    async update(
        id: string,
        updateDto: UpdateTouchPointDto,
        user: UserEntity,
    ): Promise<TouchPointEntity> {
        const touchpoint = await this.repository.findOne({ id });
        if (!touchpoint) {
            throw new HttpException(
                'Cập nhật thất bại',
                HttpStatus.NOT_ACCEPTABLE,
            );
        }
        const updatedTouchPoint = Object.assign(touchpoint, {
            ...updateDto,
            updatedBy: user.id,
        });
        return this.repository.save(updatedTouchPoint);
    }
}
