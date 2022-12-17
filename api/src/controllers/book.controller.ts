import { Request, Response, NextFunction } from 'express';

export class BookController {
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            console.log('elo');
        } catch (error) {
            next(error);
        }
    }

    static async get() {
        console.log('elo');
    }
}