import { IsAlphanumeric, IsDecimal, IsNumber, IsOptional, IsString } from 'class-validator';
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
    @IsNumber()
    author: Author;

    @OneToOne(() => Category, (category) => category.id)
    @IsNumber()
    category: Category;

    @OneToOne(() => School, (school) => school.id)
    @IsNumber()
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
    @IsNumber()
    amount: number;

    @Column({
        type: 'int'
    })
    @IsNumber()
    quantity: number;

    @Column({
        type: 'decimal'
    })
    @IsDecimal()
    price: number;

    @Column({
        type: 'int'
    })
    @IsNumber()
    publishYear: number;

    @Column({
        type: 'text'
    })
    @IsOptional()
    description: string;
}