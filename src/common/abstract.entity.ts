'use strict';

import {
    AfterUpdate,
    BeforeInsert,
    CreateDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

import { UtilsService } from '../providers/utils.service';
import { AbstractDto } from './dto/AbstractDto';

export abstract class AbstractEntity<T extends AbstractDto = AbstractDto> {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn({
        type: 'timestamp with time zone',
        name: 'created_at',
    })
    createdAt: Date;
    @UpdateDateColumn({
        type: 'timestamp with time zone',
        name: 'updated_at',
    })
    updatedAt: Date;
    @BeforeInsert()
    updateDates(): void {
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
    @AfterUpdate()
    resetDates(): void {
        this.updatedAt = new Date();
    }

    abstract dtoClass: new (entity: AbstractEntity, options?: any) => T;

    toDto(options?: any) {
        return UtilsService.toDto(this.dtoClass, this, options);
    }
}
