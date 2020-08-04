import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import { AbstractRepository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';

import { StatusTouchPoint } from '../../../../common/constants/status-touchpoint';
import { PageMetaDto } from '../../../../common/dto/PageMetaDto';
import { FileDto } from '../../../../modules/file/dto/fileDto';
import { OrderTouchPointDto } from '../../../../modules/lead/dto/fileTouchPoint/OrderTouchPointDto';
import { TaskDto } from '../../../../modules/lead/dto/task/TaskDto';
import { UpdateDetailTouchPointDto } from '../../../../modules/lead/dto/touchpoint/UpdateDetailTouchPointDto';
import { UpdateTouchPointMarkDoneDto } from '../../../../modules/lead/dto/touchpoint/UpdateTouchPointMarkDoneDto';
import { TaskEntity } from '../../../../modules/lead/entity/Task/task.entity';
import { FileEntity } from '../../../file/file.entity';
import { InfoLeadTouchPointDto } from '../../../lead/dto/touchpoint/InfoLeadTouchPointDto';
import { TouchPointDto } from '../../../lead/dto/touchpoint/TouchPointDto';
import { TouchPointsPageDto } from '../../../lead/dto/touchpoint/TouchPointsPageDto';
import { TouchPointsPagesOptionsDto } from '../../../lead/dto/touchpoint/TouchPointsPagesOptionsDto';
import { TouchPointFileEntity } from '../../../lead/entity/Touchpoint_file/fileTouchPoint.entity';
import { UserEntity } from '../../../user/user.entity';
import { InfoFileTouchPointDto } from '../../dto/touchpoint/InfoFileTouchPointDto';
import { UpdateTouchPointDto } from '../../dto/touchpoint/UpdateTouchPointDto';
import { TouchPointEntity } from '../../entity/Touchpoint/touchpoint.entity';

@EntityRepository(TouchPointEntity)
export class TouchPointRepository extends AbstractRepository<TouchPointEntity> {
    public async create(
        user: UserEntity,
        touchPointDto: UpdateTouchPointDto,
    ): Promise<TouchPointEntity> {
        touchPointDto.meetingDate = new Date();
        touchPointDto.actualDate = touchPointDto.meetingDate;
        const lastEntity = await this.repository.findOne({
            select: ['order'],
            where: { leadId: touchPointDto.leadId },
            order: {
                id: 'DESC',
            },
        });
        let order = 1;
        if (lastEntity) {
            order = order + 1;
        }
        touchPointDto.status = StatusTouchPoint.DRAFT;
        const touchPointEntity = this.repository.create({
            order,
            ...touchPointDto,
            createdBy: user.id,
            updatedBy: user.id,
        });
        const newTouchPoint = await this.repository.save(touchPointEntity);
        return newTouchPoint.toDto() as TouchPointEntity;
    }

    public async createTouchPointWithLane(
        user: UserEntity,
        lane: string,
        leadId: number,
    ): Promise<TouchPointEntity> {
        const lastEntity = await this.repository.findOne({
            select: ['order'],
            where: { leadId },
            order: {
                id: 'DESC',
            },
        });
        let order = 1;
        if (lastEntity) {
            order = order + 1;
        }
        const touchPointEntity = this.repository.create({
            lane,
            order,
            leadId,
            status: StatusTouchPoint.DRAFT,
            createdBy: user.id,
            updatedBy: user.id,
            meetingDate: new Date(),
            actualDate: new Date(),
        });
        const newTouchPoint = await this.repository.save(touchPointEntity);
        return newTouchPoint.toDto() as TouchPointEntity;
    }

    public async getList(
        pageOptionsDto: TouchPointsPagesOptionsDto,
    ): Promise<TouchPointsPageDto> {
        Logger.log('tp.service');
        const queryBuilder = this.repository
            .createQueryBuilder('touchpoint')
            .leftJoinAndSelect('touchpoint.lead', 'lead')
            .leftJoinAndSelect('touchpoint.task', 'task')
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
            file.map((item) => {
                const infoFile = new InfoFileTouchPointDto(
                    item as TouchPointFileEntity,
                );
                const infoDetailFile = new FileDto(infoFile.file as FileEntity);
                infoFile.file = infoDetailFile;
                listFile.push(infoFile);
            });
            const task = touchpoint.task;
            const listTask = [] as TaskDto[];
            task.map((item) => {
                const infoTask = new TaskDto(item as TaskEntity);
                listTask.push(infoTask);
            });
            touchpoint.task = listTask;
            touchpoint.fileTouchPoint = listFile;
            result.push(touchpoint);
        });
        return new TouchPointsPageDto(result, pageMetaDto);
    }

    public async getTouchPointById(id: string): Promise<TouchPointDto> {
        const touchPointInfo = await this.repository.findOne({
            where: { id },
            relations: [
                'fileTouchPoint.file',
                'fileTouchPoint.touchPoint',
                'fileTouchPoint',
                'lead',
                'task',
            ],
        });
        const touchpoint = new TouchPointDto(touchPointInfo);
        touchpoint.lead = new InfoLeadTouchPointDto(touchPointInfo.lead);
        const file = touchpoint.fileTouchPoint;
        const listFile = [] as InfoFileTouchPointDto[];
        file.map((item) => {
            const infoFile = new InfoFileTouchPointDto(
                item as TouchPointFileEntity,
            );
            const infoDetailFile = new FileDto(infoFile.file as FileEntity);
            infoFile.file = infoDetailFile;
            const orderTouchPoint = new OrderTouchPointDto(
                infoFile.touchPoint as TouchPointEntity,
            );
            infoFile.touchPoint = orderTouchPoint;
            listFile.push(infoFile);
            touchpoint.fileTouchPoint = listFile;
        });
        const task = touchpoint.task;
        const listTask = [] as TaskDto[];
        task.map((item) => {
            const infoTask = new TaskDto(item as TaskEntity);
            listTask.push(infoTask);
        });
        touchpoint.task = listTask;
        touchpoint.task.sort(
            (a, b) => a.createdAt.getTime() - b.createdAt.getTime(),
        );

        return touchpoint;
    }

    async update(
        id: string,
        updateDto: UpdateDetailTouchPointDto,
        user: UserEntity,
    ): Promise<TouchPointEntity> {
        updateDto.actualDate = updateDto.meetingDate;
        const touchpoint = await this.repository.findOne({ id });
        if (!touchpoint) {
            throw new HttpException('Update failed', HttpStatus.NOT_ACCEPTABLE);
        }
        const updatedTouchPoint = Object.assign(touchpoint, {
            ...updateDto,
            updatedBy: user.id,
        });
        const update = await this.repository.save(updatedTouchPoint);
        void this.sortTouchPoint(touchpoint.leadId);
        return update;
    }

    async updateMarkDone(
        id: string,
        updateDto: UpdateTouchPointMarkDoneDto,
        user: UserEntity,
    ): Promise<TouchPointEntity> {
        const touchpoint = await this.repository.findOne({ id });
        const lateTouchPoint = await this.repository.findOne({
            order: touchpoint.order + 1,
            leadId: touchpoint.leadId,
        });
        if (lateTouchPoint && updateDto.status === StatusTouchPoint.DONE) {
            lateTouchPoint.status = StatusTouchPoint.IN_PROGRESS;
        }
        if (!touchpoint) {
            throw new HttpException('Update failed', HttpStatus.NOT_ACCEPTABLE);
        }
        void this.repository.save(lateTouchPoint);
        const updatedTouchPoint = this.repository.merge(touchpoint, {
            ...updateDto,
            updatedBy: user.id,
        });
        const markDone = await this.repository.save(updatedTouchPoint);
        await this.sortTouchPoint(touchpoint.leadId);
        return markDone;
    }

    async sortTouchPoint(leadId: number) {
        const index = {
            [StatusTouchPoint.DONE]: 1,
            [StatusTouchPoint.IN_PROGRESS]: 2,
            [StatusTouchPoint.DRAFT]: 3,
        };
        const entity = await this.repository.find({
            where: { leadId },
            order: {
                actualDate: 'ASC',
            },
        });
        entity
            .sort((a, b) => a.actualDate.getTime() - b.actualDate.getTime())
            .sort((a, b) => index[a.status] - index[b.status]);

        const newOrderEntities = entity.map((touchpoint, i) =>
            Object.assign(touchpoint, {
                order: i + 1,
            }),
        );
        void this.repository.save(newOrderEntities);
    }
}
