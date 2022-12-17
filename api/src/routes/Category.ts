import { Router } from 'express';
import passport from '../auth/school.auth';
import { CategoryController } from '../controllers/category.controller';
import { auth } from '../middleware/auth';

const CategoryRouter = Router();

CategoryRouter.post('/', auth, CategoryController.create);
CategoryRouter.get('/', auth, CategoryController.get);

export default CategoryRouter;