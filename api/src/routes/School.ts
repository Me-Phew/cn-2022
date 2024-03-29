import { SchoolController } from '../controllers/school.controller';
import { LoginController } from '../controllers/login.controller';
import { Router } from 'express';
import passport from '../auth/school.auth';
import { auth } from '../middleware/auth';

const SchoolRouter = Router();

SchoolRouter.post('/', SchoolController.create);
SchoolRouter.post('/generate-codes', auth, SchoolController.generateCodes);
SchoolRouter.get('/get-codes', auth, SchoolController.getCodes);
SchoolRouter.get('/validate-code/:code', SchoolController.validateCode);
SchoolRouter.post('/login', passport.authenticate('local'), LoginController.login);
SchoolRouter.post('/logout', auth, LoginController.logout);

export default SchoolRouter;