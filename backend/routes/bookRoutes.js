import express from 'express'
import {
  getFreeBooks,
  getAllBooks,
  getBookById,
  getPreviewBooks
} from '../controllers/bookController.js'

import { previewBooks } from '../data/previewBooks.js';
import { freeLibrary } from '../data/freeLibrary.js';

const router = express.Router()

// GET /api/books/free
router.get('/library', (req, res) => {
  res.json(freeLibrary);
});

// GET /api/books/preview
router.get('/preview', (req, res) => {
  res.json(previewBooks);
});

// GET /api/books
router.get('/', getAllBooks)

// GET /api/books/:id
router.get('/:id', getBookById)

export default router

