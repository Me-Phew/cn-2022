import { Router } from 'express';
import passport from '../auth/school.auth';
import { CategoryController } from '../controllers/category.controller';

const CategoryRouter = Router();

CategoryRouter.post('/', CategoryController.create);
CategoryRouter.get('/', CategoryController.get);

export default CategoryRouter;