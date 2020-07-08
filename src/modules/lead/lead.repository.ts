import { HttpException, HttpStatus } from '@nestjs/common';
import { AbstractRepository, getConnection } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';

import { PageMetaDto } from '../../common/dto/PageMetaDto';
import { UserEntity } from '../user/user.entity';
import { InfoLeadCompanyDto } from './dto/InfoLeadCompanyDto';
import { InfoLeadContactDto } from './dto/InfoLeadContactDto';
import { LeadDto } from './dto/LeadDto';
import { LeadsPageDetailDto } from './dto/LeadsPageDetailDto';
import { LeadsPageOptionsDto } from './dto/LeadsPageOptionsDto';
import { LeadUpdateDto } from './dto/LeadUpdateDto';
import { LeadEntity } from './lead.entity';
import { ContactEntity } from '../client/entity/contact.entity';
import { DetailLeadDto } from './dto/DetailLeadDto';
@EntityRepository(LeadEntity)
export class LeadRepository extends AbstractRepository<LeadEntity> {
    public async create(
        user: UserEntity,
        createDto: LeadUpdateDto,
    ): Promise<LeadEntity> {
        const leadObj = Object.assign(createDto, {
            createdBy: user.id,
            updatedBy: user.id,
        });
        for await (const iterator of leadObj.tag) {
            console.table(iterator)
        }
        const lead = this.repository.create({ ...leadObj });
        return this.repository.save(lead);
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
            relations: ['company', 'note','contact'],
        });
        const result = new DetailLeadDto(leadInfo);
        result.company = new InfoLeadCompanyDto(leadInfo.company);
        const listContact=[];
        result.contact.forEach((item) => {
            const infoContact = new InfoLeadContactDto(
                item as ContactEntity,
            );
            listContact.push(infoContact);
        });
        result.contact= listContact;
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
            .where('1=1')
            .andWhere('LOWER (lead.name) LIKE :name', {
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
            const listContact = [];
            contact.forEach((item) => {
                const infoContact = new InfoLeadContactDto(
                    item as ContactEntity,
                );
                listContact.push(infoContact);
            });
            lead.contact = listContact;
            results.push(lead);
        }
        return new LeadsPageDetailDto(results, pageMetaDto);
    }
}
