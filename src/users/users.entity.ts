import { ReportEntity } from "../reports/reports.entity";
import { Entity, Column, PrimaryGeneratedColumn, AfterInsert, AfterUpdate, AfterRemove, OneToMany } from "typeorm";

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({ default: true })
    isAdmin: boolean;
    
    @OneToMany(()=> ReportEntity, (report)=> report.user)
    reports: ReportEntity[];


    @AfterInsert()
    logInsert() {
        console.log('Inserted User with Id', this.id);
    }

    @AfterUpdate()
    logUpdate() {
        console.log('Updated User with id', this.id);
    }

    @AfterRemove()
    logRemove() {
        console.log('Removed User with Id', this.id);
    }



}