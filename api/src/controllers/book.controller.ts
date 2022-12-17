import { Book } from '../entity/Book';
import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../data-source';
import { validate } from 'class-validator';
import { ValidationError } from '../errors';

export class BookController {
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const bookRepository = AppDataSource.getRepository(Book);
            const book = new Book();

            for (const [key, value] of Object.entries(req.body)) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                book[key as keyof typeof Book] = value;
            }

            const errors = await validate(book);
            if (errors.length > 0) {
                throw new ValidationError(errors);
            }

            await bookRepository.save(book);
            res.send({
                book
            });
        } catch (error) {
            next(error);
        }
    }

    static async get() {
        console.log('elo');
    }
}