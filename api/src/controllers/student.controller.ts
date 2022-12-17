import { AppDataSource } from '../data-source';
import { Student } from '../entity/Student';
import { Password } from '../entity/Password';
import { NextFunction, Request, Response } from 'express';
import { hashPassword } from 'utils/password';
import { validate } from 'class-validator';
import { ValidationError } from '../errors';

export class StudentController {
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const studentsRepo = AppDataSource.getRepository(Student);
            const student = new Student();
            const password = new Password();
            password.value = await hashPassword(req.body.password, req.body.passwordConfirm);
            password.isCurrent = true;

            for (const [key, value] of Object.entries(req.body)) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                school[key as keyof typeof School] = value;
            }

            const errors = await validate(student);
            if (errors.length > 0) {
                throw new ValidationError(errors);
            }
        } catch (error) {
            return next(error);
        }
    }
}