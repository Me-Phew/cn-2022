import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Book } from './Book';

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;

    @ManyToOne(() => Book, (book) => book.category)
    book: Book;

    @Column({
        type: 'varchar',
        length: 256
    })
    name: string;
}