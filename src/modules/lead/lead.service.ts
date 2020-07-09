import { Injectable } from '@nestjs/common';

import { UserEntity } from '../../modules/user/user.entity';
import { CompanyRepository } from '../client/repository/company.repository';
import { FileDto } from '../file/dto/fileDto';
import { DetailLeadDto } from './dto/DetailLeadDto';
import { LeadsPageDetailDto } from './dto/LeadsPageDetailDto';
import { LeadsPageOptionsDto } from './dto/LeadsPageOptionsDto';
import { LeadUpdateDto } from './dto/LeadUpdateDto';
import { FileLeadRepository } from './lead-file/lead-file.repository';
import { LeadEntity } from './lead.entity';
import { LeadRepository } from './lead.repository';
@Injectable()
export class LeadService {
    constructor(
        public readonly leadRepository: LeadRepository,
        public readonly companyRepository: CompanyRepository,
        public readonly leadFileRepository: FileLeadRepository, // public readonly fileService: FileService,
    ) {}

    async create(
        user: UserEntity,
        createDto: LeadUpdateDto,
    ): Promise<LeadEntity> {
        const createdLead = await this.leadRepository.create(user, createDto);
        for await (const iterator of createDto.file) {
            await this.leadFileRepository.create(iterator.id, createdLead.id);
        }
        return createdLead;
    }
    async update(
        id: string,
        updateDto: LeadUpdateDto,
        user: UserEntity,
    ): Promise<LeadEntity> {
        return this.leadRepository.update(id, updateDto, user);
    }

    async findLeadById(id: string): Promise<DetailLeadDto> {
        const leadEntity = await this.leadRepository.getLeadById(id);
        const leadFileEntity = await this.leadFileRepository.getByIdLead(id);
        const listFileData = [];
        for await (const iterator of leadFileEntity) {
            listFileData.push(new FileDto(await iterator.file));
        }
        const result = Object.assign(leadEntity, {
            file: listFileData,
        });
        return result as DetailLeadDto;
    }

    async getList(
        pageOptionsDto: LeadsPageOptionsDto,
    ): Promise<LeadsPageDetailDto> {
        return this.leadRepository.getList(pageOptionsDto);
    }
}
