import { Entity, JoinColumn, ManyToOne } from 'typeorm';

import { ContactEntity } from '../contact/contact.entity';
import { WebsiteEntity } from './website.entity';

@Entity({ name: 'contact_website' })
export class ContactWebsiteEntity extends WebsiteEntity {
    @ManyToOne(() => ContactEntity, (contact) => contact.website)
    @JoinColumn({ name: 'id_source' })
    contact: ContactEntity;
}
