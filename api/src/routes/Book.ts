import { Router } from 'express';
import { auth } from '../middleware/auth';
import passport from '../auth/school.auth';
import { BookController } from '../controllers/book.controller';

const BookRouter = Router();

BookRouter.post('/', auth, BookController.create);
BookRouter.get('/', auth, BookController.get);
BookRouter.get('/:id', auth, BookController.getById);

export default BookRouter;