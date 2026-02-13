import express from 'express';
import {
  getAllBooks,
  searchBooks,
  startParsing,
  getStatistics,
  deleteBook,
  deleteAllBooks,
  getCategories
} from '../controllers/bookController.js';

const router = express.Router();

router.get('/categories', getCategories);
router.get('/books', getAllBooks);
router.get('/books/search', searchBooks);
router.get('/books/statistics', getStatistics);
router.post('/parse', startParsing);
router.delete('/books/:id', deleteBook);
router.delete('/books', deleteAllBooks);

export default router;
