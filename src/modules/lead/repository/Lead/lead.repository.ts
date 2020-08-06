import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import { AbstractRepository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';

import { StatusLead } from '../../../../common/constants/status-lead';
import { StatusTouchPoint } from '../../../../common/constants/status-touchpoint';
import { TypeTouchPoint } from '../../../../common/constants/type-touchpoint';
import { PageMetaDto } from '../../../../common/dto/PageMetaDto';
import { FileDto } from '../../../../modules/file/dto/fileDto';
import { Lead4LaneDto } from '../../../../modules/lead/dto/lead/Lead4LaneDto';
import { LeadChangeRankDto } from '../../../../modules/lead/dto/lead/LeadChangeRankDto';
import { LeadChangeStatusDto } from '../../../../modules/lead/dto/lead/LeadChangeStatusDto';
import { LeadLaneDto } from '../../../../modules/lead/dto/lead/LeadLaneDto';
import { LeadUpdateByIdDto } from '../../../../modules/lead/dto/lead/LeadUpdateByIdDto';
import { TouchPointDto } from '../../../../modules/lead/dto/touchpoint/TouchPointDto';
import { TouchPointEntity } from '../../../../modules/lead/entity/Touchpoint/touchpoint.entity';
import { RankRevisionDto } from '../../../../modules/lead/field/RankRevisionDto';
import { CompanyEntity } from '../../../client/entity/company.entity';
import { ContactEntity } from '../../../client/entity/contact.entity';
import { FileEntity } from '../../../file/file.entity';
import { InfoLeadContactDto } from '../../../lead/dto/lead/InfoLeadContactDto';
import { InfoOnHovDto } from '../../../lead/dto/lead/InfoOnHovDto';
import { TaskDto } from '../../../lead/dto/task/TaskDto';
import { TaskEntity } from '../../../lead/entity/Task/task.entity';
import { TagEntity } from '../../../tag/tag.entity';
import { UserDto } from '../../../user/dto/UserDto';
import { UserEntity } from '../../../user/user.entity';
import { DetailLeadDto } from '../../dto/lead/DetailLeadDto';
import { InfoLeadCompanyDto } from '../../dto/lead/InfoLeadCompanyDto';
import { InfoLeadTagDto } from '../../dto/lead/InfoLeadTagDto';
import { LeadDto } from '../../dto/lead/LeadDto';
import { LeadsPageDetailDto } from '../../dto/lead/LeadsPageDetailDto';
import { LeadsPageOptionsDto } from '../../dto/lead/LeadsPageOptionsDto';
import { LeadUpdateDto } from '../../dto/lead/LeadUpdateDto';
import { LeadEntity } from '../../entity/Lead/lead.entity';
@EntityRepository(LeadEntity)
export class LeadRepository extends AbstractRepository<LeadEntity> {
    public logger = new Logger(LeadRepository.name);

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

        const companyEntity = await this.getRepositoryFor(
            CompanyEntity,
        ).findOne(leadDto.idCompany);

        const listContact = leadDto.linkContact.map((item) => item.idContact);
        const listContactEntity = await this.getRepositoryFor(
            ContactEntity,
        ).findByIds(listContact);

        let leadEntity = this.repository.create();
        const rankRevision = new RankRevisionDto();
        rankRevision.rank = parseInt(leadDto.rank, 10);
        rankRevision.reason = leadDto.rankRevision.reason;
        rankRevision.touchPoint = 0;
        rankRevision.updatedBy = user.id;
        rankRevision.updatedAt = Date();
        leadEntity = this.repository.merge(leadEntity, {
            ...leadDto,
            status: StatusLead.IN_PROGRESS,
            createdBy: user.id,
            updatedBy: user.id,
            file: listFileEntity,
            relatedTo: listRelatedToEntity,
            contact: listContactEntity,
            company: companyEntity,
            rankRevision: [rankRevision],
            onHov: leadDto.onHov,
        });

        const newLead = await this.repository.save(leadEntity, {
            reload: true,
        });

        return newLead.toDto() as LeadEntity;
    }

    public async update(
        id: string,
        updateDto: LeadUpdateByIdDto,
        user: UserEntity,
    ): Promise<LeadEntity> {
        const leadCurrent = await this.repository.findOne({
            where: { id },
        });

        if (!leadCurrent) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }

        const listFileEntity = await this.getRepositoryFor(
            FileEntity,
        ).findByIds(updateDto.file);

        const listRelateTo = updateDto.relatedTo.map((item) => item.idContact);
        const listRelatedToEntity = await this.getRepositoryFor(
            ContactEntity,
        ).findByIds(listRelateTo);

        const companyEntity = await this.getRepositoryFor(
            CompanyEntity,
        ).findOne(leadCurrent.idCompany);

        const listContact = updateDto.linkContact.map((item) => item.idContact);
        const listContactEntity = await this.getRepositoryFor(
            ContactEntity,
        ).findByIds(listContact);
        const rankRevision = new RankRevisionDto();
        rankRevision.rank = parseInt(updateDto.rank, 10);
        [rankRevision.reason] = [updateDto.rankRevision[0].reason] as [string];
        if (!rankRevision.reason) {
            rankRevision.reason = '';
        }
        rankRevision.touchPoint = 0;
        rankRevision.updatedBy = user.id;
        rankRevision.updatedAt = Date();
        leadCurrent.rankRevision = leadCurrent.rankRevision || [];
        leadCurrent.rankRevision.push(rankRevision);
        const updateLeadCurrent = Object.assign(leadCurrent, {
            ...updateDto,
            updatedBy: user.id,
            file: listFileEntity,
            relatedTo: listRelatedToEntity,
            contact: listContactEntity,
            company: companyEntity,
            rankRevision: leadCurrent.rankRevision,
        });
        const updatedLead = await this.repository.save(updateLeadCurrent, {
            reload: true,
        });
        this.logger.log('UPDATE');
        return updatedLead.toDto() as LeadEntity;
    }

    public async changeRank(
        id: string,
        updateDto: LeadChangeRankDto,
        user: UserEntity,
    ): Promise<LeadEntity> {
        const leadCurrent = await this.repository.findOne({
            where: { id },
        });
        if (!leadCurrent) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
        const rankRevision = new RankRevisionDto();
        rankRevision.rank = parseInt(updateDto.rank, 10);
        [rankRevision.reason] = [updateDto.rankRevision[0].reason] as [string];
        rankRevision.touchPoint = 0;
        rankRevision.updatedBy = user.id;
        rankRevision.updatedAt = Date();
        leadCurrent.rankRevision = leadCurrent.rankRevision || [];
        leadCurrent.rankRevision.push(rankRevision);
        const changeRank = this.repository.merge(leadCurrent, {
            ...updateDto,
            updatedBy: user.id,
            rankRevision: leadCurrent.rankRevision,
        });
        return this.repository.save(changeRank);
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
                'touchPoint',
                'touchPoint.task',
                'touchPoint.fileTouchPoint',
                'touchPoint.fileTouchPoint.file',
                'touchPoint.task.user',
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
        result.touchPoint.forEach((item) => {
            const infoTouchPoint = new TouchPointDto(item as TouchPointEntity);
            const listTask = [] as TaskDto[];
            infoTouchPoint.fileTouchPoint = infoTouchPoint.fileTouchPoint.map(
                (it) => {
                    const infoFileTouchPoint = new FileDto(
                        it.file as FileEntity,
                    );
                    it.file = infoFileTouchPoint;
                    return it;
                },
            );
            infoTouchPoint.task.map((it) => {
                const infoTask = new TaskDto(it as TaskEntity);
                const infoUser = new UserDto(infoTask.user as UserEntity);
                infoTask.user = infoUser;
                listTask.push(infoTask);
            });
            infoTouchPoint.task = listTask;
            listTouchPoint.push(infoTouchPoint);
        });
        listTouchPoint.sort(
            (a, b) =>
                parseInt(a.order.toString(), 10) -
                parseInt(b.order.toString(), 10),
        );
        result.touchPoint = listTouchPoint;
        return result;
    }

    public async getList(
        pageOptionsDto: LeadsPageOptionsDto,
    ): Promise<LeadsPageDetailDto> {
        this.logger.log('GET LIST');
        const queryBuilder = this.repository
            .createQueryBuilder('lead')
            .leftJoinAndSelect('lead.note', 'note')
            .leftJoinAndSelect('lead.company', 'company')
            .leftJoinAndSelect('lead.contact', 'contact')
            .leftJoinAndSelect('lead.relatedTo', 'relatedTo')
            .leftJoinAndSelect('lead.tag', 'tag')
            .leftJoinAndSelect('lead.touchPoint', 'touchpoint')
            .leftJoinAndSelect('touchpoint.task', 'task')
            .leftJoinAndSelect('task.user', 'user')
            .where('LOWER (lead.name) LIKE :name', {
                name: `%${pageOptionsDto.q.toLowerCase()}%`,
            });
        if (pageOptionsDto.status) {
            queryBuilder.andWhere('lead.status = :status', {
                status: `${pageOptionsDto.status}`,
            });
        }
        queryBuilder
            .addOrderBy('lead.rank', pageOptionsDto.order)
            .addOrderBy('lead.createdAt', pageOptionsDto.order);

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
            contact.map((item) => {
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
            lead.tag.map((item) => {
                const infoTag = new InfoLeadTagDto(item as TagEntity);
                listTag.push(infoTag);
            });
            const listTouchPoint = [] as TouchPointDto[];
            lead.touchPoint.map((item) => {
                const infoTouchPoint = new TouchPointDto(
                    item as TouchPointEntity,
                );
                const listTask = [] as TaskDto[];
                infoTouchPoint.task.map((it) => {
                    const infoTask = new TaskDto(it as TaskEntity);
                    const infoUser = new UserDto(infoTask.user as UserEntity);
                    infoTask.user = infoUser;
                    listTask.push(infoTask);
                });
                infoTouchPoint.task = listTask;
                listTouchPoint.push(infoTouchPoint);
            });
            listTouchPoint.sort((a, b) => a.order - b.order);

            lead.touchPoint = listTouchPoint;
            lead.tag = listTag;
            lead.contact = listContact;
            lead.relatedTo = listRelatedTo;
            lead.rankRevision = iterator.rankRevision;
            results.push(lead);
        }
        return new LeadsPageDetailDto(results, pageMetaDto);
    }

    public async changeStatus(
        id: string,
        updateDto: LeadChangeStatusDto,
        user: UserEntity,
    ): Promise<LeadEntity> {
        const leadCurrent = await this.repository.findOne({
            where: { id },
        });

        if (!leadCurrent) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
        const changStatus = this.repository.merge(leadCurrent, {
            ...updateDto,
            updatedBy: user.id,
        });
        return this.repository.save(changStatus);
    }

    public async getList4Lane(): Promise<Lead4LaneDto> {
        const result = new Lead4LaneDto();
        const leadHov = await this.repository.find({
            where: { onHov: 1 },
            relations: [
                'company',
                'note',
                'touchPoint',
                'touchPoint.task',
                'touchPoint.fileTouchPoint',
                'touchPoint.fileTouchPoint.file',
                'touchPoint.task.user',
            ],
        });
        result.leadHov = leadHov.map((it) => {
            const resultHov = new LeadLaneDto(it);
            resultHov.company = new InfoLeadCompanyDto(it.company);
            const listTouchPoint = [] as TouchPointDto[];
            resultHov.touchPoint.forEach((item) => {
                const infoTouchPoint = new TouchPointDto(
                    item as TouchPointEntity,
                );
                const listTask = [] as TaskDto[];
                infoTouchPoint.fileTouchPoint = infoTouchPoint.fileTouchPoint.map(
                    (i) => {
                        const infoFileTouchPoint = new FileDto(
                            i.file as FileEntity,
                        );
                        i.file = infoFileTouchPoint;
                        return i;
                    },
                );
                infoTouchPoint.task.map((j) => {
                    const infoTask = new TaskDto(j as TaskEntity);
                    const infoUser = new UserDto(infoTask.user as UserEntity);
                    infoTask.user = infoUser;
                    listTask.push(infoTask);
                });
                infoTouchPoint.task = listTask;
                listTouchPoint.push(infoTouchPoint);
            });
            listTouchPoint.sort(
                (a, b) =>
                    parseInt(a.order.toString(), 10) -
                    parseInt(b.order.toString(), 10),
            );
            resultHov.touchPoint = listTouchPoint;
            return resultHov;
        });

        const touchpointLM = await this.getRepositoryFor(TouchPointEntity).find(
            {
                where: {
                    status: StatusTouchPoint.UNDONE,
                    lane: TypeTouchPoint.LM,
                },
            },
        );
        const leadIdLM = touchpointLM.map((it) => it.leadId);
        const leadLMs = await Promise.all(
            leadIdLM.map(async (it) => {
                const leadLM = await this.findLeadById(it);
                return leadLM;
            }),
        );
        this.logger.log(leadLMs);
        result.leadLM = [];
        leadLMs.forEach((it) => {
            if (it.onHov == 0) {
                const resultLM = new LeadLaneDto(it);
                resultLM.company = new InfoLeadCompanyDto(it.company);
                const listTouchPoint = [] as TouchPointDto[];
                resultLM.touchPoint.forEach((item) => {
                    if (
                        item.status === StatusTouchPoint.UNDONE &&
                        item.lane === TypeTouchPoint.LM
                    ) {
                        const infoTouchPoint = new TouchPointDto(
                            item as TouchPointEntity,
                        );
                        const listTask = [] as TaskDto[];
                        infoTouchPoint.fileTouchPoint = infoTouchPoint.fileTouchPoint.map(
                            (i) => {
                                const infoFileTouchPoint = new FileDto(
                                    i.file as FileEntity,
                                );
                                i.file = infoFileTouchPoint;
                                return i;
                            },
                        );
                        infoTouchPoint.task.map((j) => {
                            const infoTask = new TaskDto(j as TaskEntity);
                            const infoUser = new UserDto(
                                infoTask.user as UserEntity,
                            );
                            infoTask.user = infoUser;
                            listTask.push(infoTask);
                        });
                        infoTouchPoint.task = listTask;
                        listTouchPoint.push(infoTouchPoint);
                    }
                });
                resultLM.touchPoint = listTouchPoint;
                result.leadLM.push(resultLM);
            }
        });

        const touchpointPC = await this.getRepositoryFor(TouchPointEntity).find(
            {
                where: {
                    status: StatusTouchPoint.UNDONE,
                    lane: TypeTouchPoint.PC,
                },
            },
        );
        const leadIdPC = touchpointPC.map((it) => it.leadId);

        const leadPCs = await Promise.all(
            leadIdPC.map(async (it) => {
                const leadPC = await this.findLeadById(it);
                return leadPC;
            }),
        );
        this.logger.log(leadPCs);
        result.leadPC = [];
        leadPCs.forEach((it) => {
            if (it.onHov == 0) {
                const resultPC = new LeadLaneDto(it);
                resultPC.company = new InfoLeadCompanyDto(it.company);
                const listTouchPoint = [] as TouchPointDto[];
                resultPC.touchPoint.forEach((item) => {
                    if (
                        item.status === StatusTouchPoint.UNDONE &&
                        item.lane === TypeTouchPoint.PC
                    ) {
                        const infoTouchPoint = new TouchPointDto(
                            item as TouchPointEntity,
                        );
                        const listTask = [] as TaskDto[];
                        infoTouchPoint.fileTouchPoint = infoTouchPoint.fileTouchPoint.map(
                            (i) => {
                                const infoFileTouchPoint = new FileDto(
                                    i.file as FileEntity,
                                );
                                i.file = infoFileTouchPoint;
                                return i;
                            },
                        );
                        infoTouchPoint.task.map((j) => {
                            const infoTask = new TaskDto(j as TaskEntity);
                            const infoUser = new UserDto(
                                infoTask.user as UserEntity,
                            );
                            infoTask.user = infoUser;
                            listTask.push(infoTask);
                        });
                        infoTouchPoint.task = listTask;
                        listTouchPoint.push(infoTouchPoint);
                    }
                });
                resultPC.touchPoint = listTouchPoint;
                result.leadPC.push(resultPC);
            }
        });
        const touchpointPH = await this.getRepositoryFor(TouchPointEntity).find(
            {
                where: {
                    status: StatusTouchPoint.UNDONE,
                    lane: TypeTouchPoint.PH,
                },
            },
        );

        const leadIdPH = touchpointPH.map((it) => it.leadId);
        const leadPHs = await Promise.all(
            leadIdPH.map(async (it) => {
                const leadPH = await this.findLeadById(it);
                return leadPH;
            }),
        );
        result.leadPH = [];
        leadPHs.forEach((it) => {
            if (it.onHov == 0) {
                const resultPH = new LeadLaneDto(it);
                resultPH.company = new InfoLeadCompanyDto(it.company);
                const listTouchPoint = [] as TouchPointDto[];
                resultPH.touchPoint.forEach((item) => {
                    if (
                        item.status === StatusTouchPoint.UNDONE &&
                        item.lane === TypeTouchPoint.PH
                    ) {
                        const infoTouchPoint = new TouchPointDto(
                            item as TouchPointEntity,
                        );
                        const listTask = [] as TaskDto[];
                        infoTouchPoint.fileTouchPoint = infoTouchPoint.fileTouchPoint.map(
                            (i) => {
                                const infoFileTouchPoint = new FileDto(
                                    i.file as FileEntity,
                                );
                                i.file = infoFileTouchPoint;
                                return i;
                            },
                        );
                        infoTouchPoint.task.map((j) => {
                            const infoTask = new TaskDto(j as TaskEntity);
                            const infoUser = new UserDto(
                                infoTask.user as UserEntity,
                            );
                            infoTask.user = infoUser;
                            listTask.push(infoTask);
                        });
                        infoTouchPoint.task = listTask;
                        listTouchPoint.push(infoTouchPoint);
                    }
                });
                resultPH.touchPoint = listTouchPoint;
                result.leadPH.push(resultPH);
            }
        });

        return result;
    }
    async findLeadById(it: number) {
        return this.repository.findOne({
            where: { id: it },
            relations: [
                'company',
                'note',
                'touchPoint',
                'touchPoint.task',
                'touchPoint.fileTouchPoint',
                'touchPoint.fileTouchPoint.file',
                'touchPoint.task.user',
            ],
        });
    }
    public async onHov(
        id: string,
        onHovDto: InfoOnHovDto,
        user: UserEntity,
    ): Promise<LeadEntity> {
        this.logger.log(id);
        const leadCurrent = await this.repository.findOne({
            where: { id },
        });
        this.logger.log(leadCurrent);
        if (!leadCurrent) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }

        const updatedLead = this.repository.merge(leadCurrent, {
            ...onHovDto,
            updatedBy: user.id,
        });
        return this.repository.save(updatedLead);
    }
}
