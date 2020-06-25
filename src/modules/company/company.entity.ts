import { Column, Entity } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { CompanyDto } from './dto/CompanyDto';

@Entity({ name: 'company' })
export class CompanyEntity extends AbstractEntity<CompanyDto> {
    @Column({ nullable: false })
    name: string;
    @Column({ nullable: false })
    url: string;
    @Column({ nullable: true, type: 'jsonb' })
    address: string;
    @Column({ nullable: true, type: 'jsonb' })
    email: string;
    @Column({ nullable: true, type: 'jsonb' })
    phone: string;
    @Column({ nullable: true, type: 'jsonb' })
    website: string;
    @Column({
        nullable: true,
        name: 'created_by',
    })
    createdBy: string;
    @Column({
        nullable: true,
        name: 'updated_by',
    })
    updatedBy: string;

    dtoClass = CompanyDto;
}
