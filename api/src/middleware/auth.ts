import { AuthenticationError } from '../errors/custom/Auth';
import { NextFunction, Request, Response } from 'express';

export function auth(req: Request, res: Response, next: NextFunction) {
    if (!req.isAuthenticated()) {
        return next(new AuthenticationError());
    }

    next();
}