import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { CompanyDto } from './dto/CompanyDto';

@Entity({ name: 'company' })
export class CompanyEntity extends AbstractEntity<CompanyDto> {
    @PrimaryGeneratedColumn()
    id: string;
    @Column({ nullable: false, type: 'varchar', length: 200 })
    name: string;
    @Column({ nullable: true, type: 'varchar', length: 250 })
    address: string;
    @Column({ nullable: true, type: 'varchar', length: 250 })
    email: string;
    @Column({ nullable: true, type: 'varchar', length: 15 })
    phone: string;
    @Column({ nullable: true, type: 'varchar', length: 250 })
    website: string;
    @Column({ nullable: true, type: 'varchar', length: 250 })
    url: string;
    @Column({ nullable: false, type: 'varchar', length: 250 })
    created_by: string;
    @Column({ nullable: true, type: 'varchar', length: 250 })
    updated_by: string;
    dtoClass = CompanyDto;
}
