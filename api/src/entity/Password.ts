import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { School } from './School';
import { Student } from './Student';

@Entity()
export class Password {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;

    @ManyToOne(() => School, (school) => school.password)
    school: School;

    @ManyToOne(() => Student, (student) => student.password)
    student: Student;

    @Column({
        type: 'varchar',
        length: 256
    })
    value: string;

    @Column({
        type: 'boolean',
        default: false,
    })
    isCurrent: boolean;
}