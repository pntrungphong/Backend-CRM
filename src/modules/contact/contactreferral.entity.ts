import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ContactEntity } from './contact.entity';
import { integer } from 'aws-sdk/clients/cloudfront';
import { ContactReferralDto } from '../contactreferral/dto/ContactReferralDto';
import { type } from 'os';

@Entity({ name: 'contact_referral' })
export class ContactReferralEntity {

  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({name: 'id_source'})
  idSource: string;

  @Column({name: 'id_target'})
  idTarget: string;

  @Column({name: 'hastag'})
  hastag: string;

  @ManyToOne(type => ContactEntity, (contact) => contact.contactReferral)
  @JoinColumn({
      name: 'id_source', 
  })
  contact: ContactEntity;
}