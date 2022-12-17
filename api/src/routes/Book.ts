import { Router } from 'express';
import { auth } from '../middleware/auth';
import { BookController } from '../controllers/book.controller';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });
const BookRouter = Router();

BookRouter.post('/', auth, upload.single('thumbnail'),  BookController.create);
BookRouter.get('/', auth, BookController.get);
BookRouter.get('/:id', auth, BookController.getById);

export default BookRouter;