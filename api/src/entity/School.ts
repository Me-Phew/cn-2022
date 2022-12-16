import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { IsEmail, IsIn, Length, IsNumberString, IsOptional } from 'class-validator';
import { SchoolStatus, status } from '../types';
import { Password } from './Password';

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