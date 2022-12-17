import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { School } from './School';
import { Password } from './Password';
import { IsEmail, IsOptional, Length } from 'class-validator';


@Entity()
export class Student {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;

    @ManyToOne(() => School, (school) => school.students)
    school: School;

    @OneToMany(() => Password, (password) => password.student)
    password: Password[];

    @Column({
        unique: true
    })
    @IsEmail()
    email: string;

    @Column({
        type: 'varchar',
        length: 256
    })
    @Length(5, 256)
    firstName: string;

    @Column({
        type: 'varchar',
        length: 256,
        nullable: true
    })
    @IsOptional()
    @Length(5, 256)
    secondName: string;

    @Column({
        type: 'varchar',
        length: 256
    })
    @Length(5, 256)
    lastName: string;
}