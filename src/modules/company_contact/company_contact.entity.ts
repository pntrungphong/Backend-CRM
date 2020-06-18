/* eslint-disable @typescript-eslint/no-unused-vars */
import { Column, Entity, ManyToOne } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { CompanyEntity } from '../company/company.entity';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CompanyDto } from './dto/CompanyContactDto';
@Entity({ name: 'company_contact' })
export class CompanyContactEntity extends AbstractEntity<CompanyDto> {
    @Column({ nullable: true })
    // eslint-disable-next-line @typescript-eslint/tslint/config
    idCompany: string;

    @Column({ nullable: true })
    // eslint-disable-next-line @typescript-eslint/tslint/config
    idContact: string;
    dtoClass = CompanyDto;

    @ManyToOne((type) => CompanyEntity, (cp) => cp.cpct)
    cp: CompanyEntity[];
}
