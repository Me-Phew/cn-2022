import { AppDataSource } from '../data-source';
import { Category } from '../entity/Category';
import { validate } from 'class-validator';
import { ValidationError } from '../errors';
import { Request, Response, NextFunction } from 'express';


export class CategoryController {
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const categoryRepo = AppDataSource.getRepository(Category);
            const category = new Category();

            category.name = req.body.name;

            const errors = await validate(category);
            if (errors.length > 0) {
                throw new ValidationError(errors);
            }

            if (await CategoryController.categoryExists(req.body.name)) {
                throw new ValidationError([], 'Such category already exists.', 409);
            }

            await categoryRepo.save(category);
            res.send({
                category: category
            });
        } catch (error) {
            return next(error);
        }
    }

    static async get(req: Request, res: Response, next: NextFunction) {
        try {
            const categoryRepo = AppDataSource.getRepository(Category);
            const categories = await categoryRepo.find({
                ...(req.query.limit ? {
                    take: +req.query.limit
                } : {})
            });

            res.send({
                categories: categories
            });
        } catch (err) {
            return next(err);
        }
    }

    private static async categoryExists(name: string) {
        const repository = AppDataSource.getRepository(Category);
        const category = await repository.findOne({
            where: [
                { name }
            ]
        });

        return !!category;
    }
}