import { Column, Entity } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { RoleType } from '../../common/constants/role-type';
import { CompanyDto } from './dto/CompanyDto';

@Entity({ name: 'companys' })
export class CompanyEntity extends AbstractEntity<CompanyDto> {
    @Column({ nullable: true })
    name: string;

    @Column({ nullable: true })
    url: string;
    
    dtoClass = CompanyDto;
}
