import { Request, Response, NextFunction } from 'express';

export class LoginController {
    static async login(req: Request, res: Response, next: NextFunction) {
        res.send({
            ...req.user,
            accountType: 'school'
        });
    }

    static async logout(req: Request, res: Response, next: NextFunction) {
        req.logout((err) =>  {
            if (err) {
                return next(err);
            }

            res.send('elo');
        });
    }
}