import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ContactEntity } from '../contact/contact.entity';
import { integer } from 'aws-sdk/clients/cloudfront';
import { ContactReferralDto } from './dto/ContactReferralDto';

@Entity({ name: 'contact_referral' })
export class ContactReferralEntity {

  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({name: 'id_source'})
  idSource: string;

  @Column({name: 'id_target'})
  idTarget: string;

  @Column({name: 'status'})
  status: string;

  @ManyToOne(type => ContactEntity, (contact) => contact.id)
  @JoinColumn({
      name: 'id_source', 
  })
  contact: ContactEntity;
}