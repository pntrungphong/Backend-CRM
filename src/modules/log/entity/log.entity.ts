import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity({ name: 'log' })
export class LogEntity {
    @PrimaryGeneratedColumn('uuid')
    id: number;
    @Column({ name: 'type' })
    type: string;
    @Column({ name: 'entity_type' })
    entityType: string;
    @Column({ name: 'entity_id' })
    entityId: number;
    @Column({ type: 'jsonb', name: 'before_update' })
    beforeUpdate: string;
    @Column({ type: 'jsonb', name: 'after_update' })
    afterUpdate: string;
    @Column({ type: 'jsonb', name: 'field_change' })
    fieldChange: number;
    @Column({ nullable: false, name: 'created_by' })
    createdBy: string;
    @Column({
        type: 'timestamp with time zone',
        name: 'created_at',
        default: Date.now(),
    })
    createdAt: Date;
}
