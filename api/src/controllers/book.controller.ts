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

    static async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const bookRepo = AppDataSource.getRepository(Book);
            const book = await bookRepo.findOne({
                where: [
                    { id: +id }
                ],
                relations: {
                    author: true, 
                }
            });

            res.send({
                book: book
            });
        } catch (error) {
            return next(error);
        }
    }

    static async get(req: Request, res: Response, next: NextFunction) {
        try {
            const { limit } = req.query;
            const bookRepo = AppDataSource.getRepository(Book);
            const books = await bookRepo.find({
                ...(limit ? { take: +limit } : {})
            });
            
            res.send({
                books
            });
        } catch (error) {
            return next(error);
        }
    }
}