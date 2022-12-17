import { Router } from 'express';
import { auth } from '../middleware/auth';
import passport from '../auth/school.auth';
import { AuthorController } from '../controllers/author.controller';

const AuthorRouter = Router();

AuthorRouter.post('/', auth, AuthorController.create);
AuthorRouter.get('/', auth, AuthorController.get);

export default AuthorRouter;