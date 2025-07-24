import express from 'express'
import {
  getFreeBooks,
  getAllBooks,
  getBookById,
  getPreviewBooks
} from '../controllers/bookController.js'

const router = express.Router()

// GET /api/books/free
router.get('/free', getFreeBooks)

// GET /api/books/preview
router.get('/preview', getPreviewBooks)

// GET /api/books
router.get('/', getAllBooks)

// GET /api/books/:id
router.get('/:id', getBookById)

export default router

