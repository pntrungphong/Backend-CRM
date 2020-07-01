import { Injectable } from '@nestjs/common';

import { LeadDto } from './dto/LeadDto';
import { LeadRepository } from './lead.repository';

@Injectable()
export class LeadService {
    constructor(private _leadRepository: LeadRepository) {}
    getList(): Promise<LeadDto> {
        const queryBuilder = this._leadRepository
            .createQueryBuilder('lead')
            .leftJoinAndSelect('lead.company', 'company')
            .getMany();

        console.table(queryBuilder);
        return;
    }
}
