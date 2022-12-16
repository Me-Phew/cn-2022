import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne } from 'typeorm';
import { Author } from './Author';
import { Category } from './Category';
import { School } from './School';

@Entity()
export class Book {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: string;

    @OneToOne(() => Author, (author) => author.id)
    author: Author;

    @OneToOne(() => Category, (category) => category.id)
    category: Category;

    @OneToOne(() => School, (school) => school.id)
    school: School;

    @UpdateDateColumn()
    updatedAt: string;

    @Column({
        type: 'varchar',
        length: 256
    })
    title: string;

    @Column({
        type: 'int'
    })
    amount: number;

    @Column({
        type: 'int'
    })
    quantity: number;

    @Column({
        type: 'decimal'
    })
    price: number;

    @Column({
        type: 'text'
    })
    description: string;

    @Column({
        type: 'timestamp'
    })
    publish_year: string;
}