import { Column, Entity } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { CompanyDto } from './dto/CompanyDto';

@Entity({ name: 'company' })
export class CompanyEntity extends AbstractEntity<CompanyDto> {
    @Column({ nullable: false, type: 'varchar', length: 200 })
    name: string;
    @Column({ nullable: true, type: 'varchar', length: 1000 })
    address: string;
    @Column({ nullable: false, type: 'varchar', length: 500 })
    email: string;
    @Column({ nullable: true, type: 'varchar', length: 500 })
    phone: string;
    @Column({ nullable: true, type: 'varchar', length: 500 })
    website: string;
    @Column({ nullable: true, type: 'varchar', length: 500 })
    url: string;
    @Column({ nullable: false, type: 'varchar', length: 500 })
    tag: string;
    @Column({
        nullable: true,
        type: 'varchar',
        length: 200,
        name: 'created_by',
    })
    createdBy: string;
    @Column({
        nullable: true,
        type: 'varchar',
        length: 200,
        name: 'updated_by',
    })
    updatedBy: string;
    dtoClass = CompanyDto;
}
