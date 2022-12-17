import { Router } from 'express';
import passport from '../auth/school.auth';
import { CategoryController } from '../controllers/category.controller';

const CategoryRouter = Router();

CategoryRouter.post('/', passport.authenticate('local'), CategoryController.create);
CategoryRouter.get('/', passport.authenticate('local'), CategoryController.get);

export default CategoryRouter;