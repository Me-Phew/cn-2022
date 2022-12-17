import { Router } from 'express';
import passport from '../auth/school.auth';
import { AuthorController } from '../controllers/author.controller';

const AuthorRouter = Router();

AuthorRouter.post('/', passport.authenticate('local'), AuthorController.create);
AuthorRouter.get('/', passport.authenticate('local'), AuthorController.get);

export default AuthorRouter;