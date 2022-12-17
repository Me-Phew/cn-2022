import { StudentController } from '../controllers/student.controller';
import { Router } from 'express';

const SchoolRouter = Router();

SchoolRouter.post('/', StudentController.create);

export default SchoolRouter;