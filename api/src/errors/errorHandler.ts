import { NextFunction, Request, Response } from 'express';
import { ValidationError, AuthenticationError } from './custom';

export function errorHandler(err: Error | ValidationError, req: Request, res: Response, next: NextFunction) {
    if (err instanceof ValidationError || err instanceof AuthenticationError) {
        return res.status(err.code).send(err.getError());
    }

    res.send(err.message);
}