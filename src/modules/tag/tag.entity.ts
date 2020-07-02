import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tag' })
export class TagEntity {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column({ name: 'tag' })
    tag: string;
}
