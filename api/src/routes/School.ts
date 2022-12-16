import { SchoolController } from '../controllers/school.controller';
import { Router } from 'express';

const SchoolRouter = Router();

SchoolRouter.post('/', SchoolController.create);

export default SchoolRouter;