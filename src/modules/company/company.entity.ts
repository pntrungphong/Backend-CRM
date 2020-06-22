import { Column, Entity } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { CompanyDto } from './dto/CompanyDto';

@Entity({ name: 'company' })
export class CompanyEntity extends AbstractEntity<CompanyDto> {
    @Column({ nullable: false, type: 'varchar', length: 200 })
    name: string;
    @Column({ nullable: true, type: 'varchar', length: 250 })
    address: string;
    @Column({ nullable: false, type: 'varchar', length: 250 })
    email: string;
    @Column({ nullable: true, type: 'varchar', length: 15 })
    phone: string;
    @Column({ nullable: true, type: 'varchar', length: 250 })
    website: string;
    @Column({ nullable: true, type: 'varchar', length: 250 })
    url: string;
    @Column({
        nullable: true,
        type: 'varchar',
        length: 250,
        name: 'created_by',
    })
    createdBy: string;
    @Column({
        nullable: true,
        type: 'varchar',
        length: 250,
        name: 'updated_by',
    })
    updatedBy: string;
    dtoClass = CompanyDto;
}
