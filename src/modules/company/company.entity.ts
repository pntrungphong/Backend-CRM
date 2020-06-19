import {
    AfterUpdate,
    BeforeInsert,
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'company' })
export class CompanyEntity {
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
    @Column({ nullable: false, type: 'timestamptz' })
    createAt: Date;
    @Column({ nullable: false, type: 'timestamptz' })
    updateAt: Date;
    @Column({ nullable: false, type: 'varchar' })
    createBy: string;
    @Column({ nullable: false, type: 'varchar' })
    updateBy: string;
    @BeforeInsert()
    updateDates(): void {
        this.createAt = new Date();
        this.updateAt = new Date();
    }
    @AfterUpdate()
    resetDates(): void {
        this.updateAt = new Date();
    }
}
