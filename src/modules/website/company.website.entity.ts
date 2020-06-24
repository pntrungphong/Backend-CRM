import { Entity, JoinColumn, ManyToOne } from 'typeorm';

import { CompanyEntity } from '../company/company.entity';
import { WebsiteEntity } from './website.entity';

@Entity({ name: 'company_website' })
export class CompanyWebsiteEntity extends WebsiteEntity {
    @ManyToOne(() => CompanyEntity, (company) => company.website)
    @JoinColumn({ name: 'id_source' })
    company: CompanyEntity;
}
