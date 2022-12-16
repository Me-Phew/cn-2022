import { NextFunction, Request, Response } from 'express';
import { School } from './../entity/School';
import { Password } from './../entity/Password';
import { AppDataSource } from '../data-source';
import { validate } from 'class-validator';
import { ValidationError } from './../errors/custom';
import { hashPassword } from '../utils/password';

export class SchoolController {
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const schoolRepo = AppDataSource.getRepository(School);
            const passwordRepo = AppDataSource.getRepository(Password);
            const school = new School();
            const password = new Password();
            password.value = await hashPassword(req.body.password, req.body.passwordConfirm);
            password.isCurrent = true;

            school.verificationStatus = 'pending';
            for (const [key, value] of Object.entries(req.body)) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                school[key as keyof typeof School] = value;
            }

            const errors = await validate(school);
            if (errors.length > 0) {
                throw new ValidationError(errors);
            }

            if (await SchoolController.schoolExistst(req.body.email, req.body.nip, req.body.regon, req.body.rspo )) {
                throw new ValidationError([], 'Such school already exists.', 409);
            };

            await passwordRepo.save(password);
            school.password = [password];
            await schoolRepo.save(school);
            res.send({});
        } catch (error) {
            return next(error);
        }
    }

    private static async schoolExistst(email: string, nip: string, regon:  string, rspo: string) {
        const repository = AppDataSource.getRepository(School);
        const school = await repository.findOne({
            where: [
                { email },
                { regon },
                (nip ?  { nip } : {}),
                (rspo ? { rspo } :  {})
            ]
        });

        return !!school;
    }
}
