import { Length } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { Book } from './Book';

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;

    @OneToMany(() => Book, (book) => book.category)
    book: Book[];

    @Column({
        type: 'varchar',
        length: 256
    })
    @Length(5, 256)
    name: string;
}