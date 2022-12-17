import { MeController } from '../controllers/me.controller';
import { Router } from 'express';
import { auth } from '../middleware/auth';

const GlobalRouter = Router();

GlobalRouter.get('/me', auth, MeController.get);

export default GlobalRouter;