import { integer } from 'aws-sdk/clients/cloudfront';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { CompanyEntity } from './company.entity';

@Entity({ name: 'tagCompany' })
export class TagCompanyEntity {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column({ name: 'id_company' })
    idCompany: integer;

    @Column({ name: 'tag' })
    tag: string;

    //   @ManyToOne(type => CompanyEntity, (company) => company.tagCompany)
    //   @JoinColumn({
    //       name: 'id_company',
    //   })
    company: CompanyEntity;
}
