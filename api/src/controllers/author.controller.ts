import { AppDataSource } from '../data-source';
import { Author } from '../entity/Author';
import { NextFunction, Request, Response } from 'express';
import { validate } from 'class-validator';
import { ValidationError } from '../errors';

export class AuthorController {
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const authorRepository = AppDataSource.getRepository(Author);
            const author = new Author();
            
            for (const [key, value] of Object.entries(req.body)) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                author[key as keyof typeof Author] = value;
            }

            const errors = await validate(author);
            if (errors.length > 0) {
                throw new ValidationError(errors);
            }

            if (await AuthorController.authorExists(req.body.firstName, req.body.lastName, req.body.secondName)) {
                throw new ValidationError([], 'Such author already exists.', 409);
            }

            await authorRepository.save(author);
            res.send({
                author
            });
        } catch (error) {
            return next(error);
        }
    }

    static async get(req: Request, res: Response, next: NextFunction) {
        try {
            const authorRepo = AppDataSource.getRepository(Author);
            const authors = await authorRepo.find({
                ...(req.query.limit ? {
                    take: +req.query.limit
                } : {})
            });

            res.send({
                authors
            });
        } catch (err) {
            return next(err);
        }
    }

    private static async authorExists(firstName: string, lastName: string, secondName: string) {
        const repository = AppDataSource.getRepository(Author);
        const author = await repository.findOneBy({
            firstName,
            lastName,
            ...(secondName ? { secondName } : {})
        });

        return !!author;
    }
}