
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { CompanyEntity } from '../company.entity';

@Entity({ name: 'tag_company' })
export class TagCompanyEntity {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column({ name: 'id_company' })
    idCompany: string;

    @Column({ name: 'tag' })
    tag: string;

    @ManyToOne(() => CompanyEntity, (company) => company.tag)
    @JoinColumn({
        name: 'id_company',
    })
    company: CompanyEntity;
}
