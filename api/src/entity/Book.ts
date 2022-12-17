import { IsDecimal, IsNumberString, IsOptional, IsString } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Author } from './Author';
import { Category } from './Category';
import { School } from './School';

@Entity()
export class Book {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: string;

    @ManyToOne(() => Author, (author) => author.book)
    author: Author;

    @ManyToOne(() => Category, (category) => category.book)
    category: Category;

    @ManyToOne(() => School, (school) => school.book)
    school: School;

    @UpdateDateColumn()
    updatedAt: string;

    @Column({
        type: 'varchar',
        length: 256
    })
    @IsString()
    title: string;

    @Column({
        type: 'int'
    })
    @IsNumberString()
    amount: number;

    @Column({
        type: 'int'
    })
    @IsNumberString()
    quantity: number;

    @Column({
        type: 'decimal'
    })
    @IsDecimal()
    price: number;

    @Column({
        type: 'int'
    })
    @IsNumberString()
    publishYear: number;

    @Column({
        type: 'text',
        nullable: true
    })
    @IsOptional()
    description: string;

    @Column({
        type: 'varchar',
        nullable: true,
        length: 256
    })
    @IsOptional()
    thumbnail: string;
}