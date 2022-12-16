import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Book } from './Book';

@Entity()
export class Author {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;

    @ManyToOne(() => Book, (book) => book.author)
    book: Book;

    @Column({
        type: 'varchar',
        length: 256
    })
    first_name: string;

    @Column({
        type: 'varchar',
        length: 256
    })
    second_name: string;

    @Column({
        type: 'varchar',
        length: 256
    })
    last_name: string;
}