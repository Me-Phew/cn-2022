import { AppDataSource } from '../data-source';
import { NextFunction, Request, Response } from 'express';
import { School } from '../entity/School';

export class MeController {
    static async get(req: Request, res: Response, next: NextFunction) {
        try {
            const schoolRepo = AppDataSource.getRepository(School);
            const school = await schoolRepo.findOneBy({
                email: (req.user as School).email
            });

            res.send(school);
        } catch (error) {
            return next(error);
        }
    }
}