import { Column, Entity, ManyToOne } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { CompanyEntity } from '../company/company.entity';
import { CompanyDto } from './dto/CompanyContactDto';
@Entity({ name: 'company_contact' })
export class CompanyContactEntity extends AbstractEntity<CompanyDto> {
    @Column({ nullable: true })
    idCompany: string;

    @Column({ nullable: true })
    idContact: string;
    dtoClass = CompanyDto;

    @ManyToOne(() => CompanyEntity, (cp) => cp.cpct)
    cp: CompanyEntity[];
}
