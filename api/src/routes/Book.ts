import { Router } from 'express';
import passport from '../auth/school.auth';
import { BookController } from '../controllers/book.controller';

const BookRouter = Router();

BookRouter.post('/', BookController.create);
BookRouter.get('/', BookController.get);

export default BookRouter;