import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { IsEmail, IsIn, Length, IsNumberString, IsOptional } from 'class-validator';
import { SchoolStatus, status } from '../types';
import { Password } from './Password';
import { Book } from './Book';
import { Student } from './Student';
import { RegistrationCode } from './RegistrationCode';

@Entity()
export class School {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;

    @Column({
        type: 'varchar',
        length: 200
    })
    @Length(5, 200)
    name: string;

    @Column({
        unique: true
    })
    @IsEmail()
    email: string;

    @OneToMany(() => Password, (password) => password.school)
    password: Password[];

    @OneToMany(() => Book, (book) => book.school)
    book: Book[];

    @OneToMany(() => RegistrationCode, (code) => code.school)
    registrationCodes: RegistrationCode[];

    @OneToMany(() => Student, (student) => student.school)
    students: Student[];

    @Column({
        default: 'pending'
    })
    @IsIn(status)
    verificationStatus: SchoolStatus;

    @Column({
        type: 'char',
        length: 9,
        unique: true
    })
    @IsNumberString()
    @Length(9)
    regon: string;

    @Column({
        type: 'char',
        length: 10,
        unique: true,
        nullable: true,
    })
    @IsOptional()
    @IsNumberString()
    @Length(10)
    nip: string;

    @Column({
        type: 'char',
        length: 8,
        unique: true,
        nullable: true
    })
    @IsOptional()
    @IsNumberString()
    @Length(4, 8)
    rspo: string;
}