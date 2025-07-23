import express from 'express'
import { getFreeBooks, getAllBooks, getBookById } from '../controllers/bookController.js'

const router = express.Router()

router.get('/free', getFreeBooks)       // GET /api/books/free
router.get('/', getAllBooks)            // GET /api/books
router.get('/:id', getBookById)         // GET /api/books/:id

export default router
