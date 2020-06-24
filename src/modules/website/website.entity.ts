import { Column, PrimaryGeneratedColumn } from 'typeorm';

export abstract class WebsiteEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true, nullable: false, name: 'id_source' })
    idSource: string;

    @Column({ nullable: true })
    name: string;

    @Column({ nullable: true })
    url: string;
}
