import { HttpException, HttpStatus } from '@nestjs/common';
import { AbstractRepository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';

import { PageMetaDto } from '../../../../common/dto/PageMetaDto';
import { CompanyEntity } from '../../../client/entity/company.entity';
import { ContactEntity } from '../../../client/entity/contact.entity';
import { FileEntity } from '../../../file/file.entity';
import { InfoLeadContactDto } from '../../../lead/dto/lead/InfoLeadContactDto';
import { TagEntity } from '../../../tag/tag.entity';
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

        const companyEntity = await this.getRepositoryFor(
            CompanyEntity,
        ).findOne(leadDto.idCompany);

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
            company: companyEntity,
        });

        const newLead = await this.repository.save(leadEntity, {
            reload: true,
        });

        return newLead.toDto() as LeadEntity;
    }

    public async update(
        id: string,
        updateDto: LeadUpdateDto,
        user: UserEntity,
    ): Promise<LeadEntity> {
        let leadCurrent = await this.repository.findOne({
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
        ).findOne(updateDto.idCompany);

        const listContact = updateDto.linkContact.map((item) => item.idContact);
        const listContactEntity = await this.getRepositoryFor(
            ContactEntity,
        ).findByIds(listContact);

        leadCurrent = this.repository.merge(leadCurrent, {
            ...updateDto,
            updatedBy: user.id,
            file: listFileEntity,
            relatedTo: listRelatedToEntity,
            contact: listContactEntity,
            company: companyEntity,
        });

        const updatedLead = await this.repository.save(leadCurrent, {
            reload: true,
        });

        return updatedLead.toDto() as LeadEntity;
    }

    public async getLeadById(id: string): Promise<DetailLeadDto> {
        const leadInfo = await this.repository.findOne({
            where: { id },
            relations: ['company', 'note', 'contact', 'file', 'relatedTo'],
        });

        const result = new DetailLeadDto(leadInfo);
        result.company = new InfoLeadCompanyDto(leadInfo.company);
        result.contact = leadInfo.contact.map(
            (it) => new InfoLeadContactDto(it),
        );
        result.relatedTo = leadInfo.relatedTo.map(
            (it) => new InfoLeadContactDto(it),
        );
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
            console.table(iterator.relatedTo);
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
            lead.tag = listTag;
            lead.contact = listContact;
            lead.relatedTo = listRelatedTo;
            results.push(lead);
        }
        return new LeadsPageDetailDto(results, pageMetaDto);
    }
}
