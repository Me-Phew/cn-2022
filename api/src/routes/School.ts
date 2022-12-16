import { SchoolController } from '../controllers/school.controller';
import { LoginController } from '../controllers/login.controller';
import { Router } from 'express';
import passport from '../auth/school.auth';

const SchoolRouter = Router();

SchoolRouter.post('/', SchoolController.create);
SchoolRouter.post('/login', passport.authenticate('local'), LoginController.login);
SchoolRouter.post('/logout', LoginController.logout);
SchoolRouter.get('/test', passport.authenticate('local'), (req, res) => res.send('elo'));

export default SchoolRouter;