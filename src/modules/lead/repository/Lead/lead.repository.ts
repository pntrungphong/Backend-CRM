import { HttpException, HttpStatus } from '@nestjs/common';
import { AbstractRepository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';

import { PageMetaDto } from '../../../../common/dto/PageMetaDto';
import { TouchPointDto } from '../../../../modules/lead/dto/touchpoint/TouchPointDto';
import { TouchPointEntity } from '../../../../modules/lead/entity/Touchpoint/touchpoint.entity';
import { ContactEntity } from '../../../client/entity/contact.entity';
import { FileEntity } from '../../../file/file.entity';
import { InfoLeadContactDto } from '../../../lead/dto/lead/InfoLeadContactDto';
import { TaskDto } from '../../../lead/dto/task/TaskDto';
import { TaskEntity } from '../../../lead/entity/Task/task.entity';
import { TagEntity } from '../../../tag/tag.entity';
import { UserDto } from '../../../user/dto/UserDto';
import { UserEntity } from '../../../user/user.entity';
import { DetailLeadDto } from '../../dto/lead/DetailLeadDto';
import { InfoLeadCompanyDto } from '../../dto/lead/InfoLeadCompanyDto';
import { InfoLeadTagDto } from '../../dto/lead/InforLeadTagDto';
import { LeadDto } from '../../dto/lead/LeadDto';
import { LeadsPageDetailDto } from '../../dto/lead/LeadsPageDetailDto';
import { LeadsPageOptionsDto } from '../../dto/lead/LeadsPageOptionsDto';
import { LeadUpdateDto } from '../../dto/lead/LeadUpdateDto';
import { LeadEntity } from '../../entity/Lead/lead.entity';
@EntityRepository(LeadEntity)
export class LeadRepository extends AbstractRepository<LeadEntity> {
    public async create(
        user: UserEntity,
        leadDto: LeadUpdateDto,
    ): Promise<LeadEntity> {
        const listFileEntity = await this.getRepositoryFor(
            FileEntity,
        ).findByIds(leadDto.file);

        const listRelateTo = leadDto.relatedTo.map((item) => item.idContact);
        const listRelatedToEntity = await this.getRepositoryFor(
            ContactEntity,
        ).findByIds(listRelateTo);
        const listContact = leadDto.linkContact.map((item) => item.idContact);
        const listContactEntity = await this.getRepositoryFor(
            ContactEntity,
        ).findByIds(listContact);
        let leadEntity = this.repository.create();
        leadEntity = this.repository.merge(leadEntity, {
            ...leadDto,
            createdBy: user.id,
            updatedBy: user.id,
            file: listFileEntity,
            relatedTo: listRelatedToEntity,
            contact: listContactEntity,
        });
        return this.repository.save(leadEntity, { reload: true });
    }

    public async update(
        id: string,
        updateDto: LeadUpdateDto,
        user: UserEntity,
    ): Promise<LeadEntity> {
        const lead = await this.repository.findOne({
            where: { id },
        });
        if (!lead) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
        const updateLead = Object.assign(lead, {
            ...updateDto,
            updated_by: user.id,
        });

        return this.repository.save(updateLead);
    }

    public async getLeadById(id: string): Promise<DetailLeadDto> {
        const leadInfo = await this.repository.findOne({
            where: { id },
            relations: [
                'company',
                'note',
                'contact',
                'file',
                'relatedTo',
                'touchpoint',
                'touchpoint.task',
                'touchpoint.task.user',
            ],
        });
        const result = new DetailLeadDto(leadInfo);
        result.company = new InfoLeadCompanyDto(leadInfo.company);
        result.contact = leadInfo.contact.map(
            (it) => new InfoLeadContactDto(it),
        );
        result.relatedTo = leadInfo.relatedTo.map(
            (it) => new InfoLeadContactDto(it),
        );
        const listTouchPoint = [] as TouchPointDto[];
        result.touchpoint.forEach((item) => {
            const infoTouchPoint = new TouchPointDto(item as TouchPointEntity);
            const listTask = [] as TaskDto[];
            infoTouchPoint.task.map((it) => {
                const infoTask = new TaskDto(it as TaskEntity);
                const inforUser = new UserDto(infoTask.user as UserEntity);
                infoTask.user = inforUser;
                listTask.push(infoTask);
            });
            infoTouchPoint.task = listTask;
            listTouchPoint.push(infoTouchPoint);
        });
        listTouchPoint.sort(
            (a, b) =>
                parseInt(a.order.toString()) - parseFloat(b.order.toString()),
        );
        result.touchpoint = listTouchPoint;
        return result;
    }

    public async getList(
        pageOptionsDto: LeadsPageOptionsDto,
    ): Promise<LeadsPageDetailDto> {
        const queryBuilder = this.repository
            .createQueryBuilder('lead')
            .leftJoinAndSelect('lead.note', 'note')
            .leftJoinAndSelect('lead.company', 'company')
            .leftJoinAndSelect('lead.contact', 'contact')
            .leftJoinAndSelect('lead.relatedTo', 'relatedTo')
            .leftJoinAndSelect('lead.tag', 'tag')
            .leftJoinAndSelect('lead.touchpoint', 'touchpoint')
            .leftJoinAndSelect('touchpoint.task', 'task')
            .leftJoinAndSelect('task.user', 'user')
            .where('LOWER (lead.name) LIKE :name', {
                name: `%${pageOptionsDto.q.toLowerCase()}%`,
            })
            .addOrderBy('lead.updatedAt', pageOptionsDto.order);
        const [leads, leadsCount] = await queryBuilder
            .skip(pageOptionsDto.skip)
            .take(pageOptionsDto.take)
            .getManyAndCount();
        const pageMetaDto = new PageMetaDto({
            pageOptionsDto,
            itemCount: leadsCount,
        });
        const results = [];
        for await (const iterator of leads) {
            const lead = new LeadDto(iterator);
            lead.company = new InfoLeadCompanyDto(iterator.company);
            const contact = lead.contact;
            const listContact = [] as InfoLeadContactDto[];
            contact.forEach((item) => {
                const infoContact = new InfoLeadContactDto(<ContactEntity>item);
                listContact.push(infoContact);
            });
            const relatedTo = lead.relatedTo;
            const listRelatedTo = [] as InfoLeadContactDto[];
            relatedTo.forEach((item) => {
                const infoRelatedTo = new InfoLeadContactDto(
                    item as ContactEntity,
                );
                listRelatedTo.push(infoRelatedTo);
            });

            const listTag = [] as InfoLeadTagDto[];
            lead.tag.forEach((item) => {
                const infoTag = new InfoLeadTagDto(item as TagEntity);
                listTag.push(infoTag);
            });
            const listTouchPoint = [] as TouchPointDto[];
            lead.touchpoint.forEach((item) => {
                const infoTouchPoint = new TouchPointDto(
                    item as TouchPointEntity,
                );
                const listTask = [] as TaskDto[];
                infoTouchPoint.task.map((it) => {
                    const infoTask = new TaskDto(it as TaskEntity);
                    const inforUser = new UserDto(infoTask.user as UserEntity);
                    infoTask.user = inforUser;
                    listTask.push(infoTask);
                });
                infoTouchPoint.task = listTask;
                listTouchPoint.push(infoTouchPoint);
            });
            listTouchPoint.sort(
                (a, b) =>
                    parseInt(a.order.toString()) -
                    parseFloat(b.order.toString()),
            );
            lead.touchpoint = listTouchPoint;
            lead.tag = listTag;
            lead.contact = listContact;
            lead.relatedTo = listRelatedTo;
            results.push(lead);
        }
        return new LeadsPageDetailDto(results, pageMetaDto);
    }
}
