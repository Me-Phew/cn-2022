import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { Book } from './Book';
import { IsOptional, Length } from 'class-validator';

@Entity()
export class Author {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;

    @OneToMany(() => Book, (book) => book.author)
    book: Book[];

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