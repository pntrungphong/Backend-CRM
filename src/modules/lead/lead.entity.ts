import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { CompanyEntity } from '../company/company.entity';
import { LeadDto } from './dto/LeadDto';
@Entity({ name: 'lead' })
export class LeadEntity extends AbstractEntity<LeadDto> {
    @Column({ nullable: false })
    name: string;
    @Column({ nullable: false })
    rank: string;
    @Column({ nullable: false })
    status: string;
    @Column({ nullable: false, name: 'created_by' })
    createdBy: string;
    @Column({ nullable: false, name: 'updated_by' })
    updatedBy: string;
    @Column({ name: 'company_id' })
    idCompany: string;
    @ManyToOne(() => CompanyEntity, (company) => company.lead)
    @JoinColumn({
        name: 'company_id',
    })
    company: CompanyEntity;
    dtoClass = LeadDto;
}
