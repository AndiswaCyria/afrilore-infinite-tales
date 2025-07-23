import express from 'express'
import { getFreeBooks, getAllBooks, getBookById } from '../controllers/bookController.js';
import Book from '../models/bookModel.js'

const router = express.Router()

// Define routes for book operations
// GET /api/books/free
router.get('/free', async (req, res) => {
  const freeBooks = await getFreeBooks()
  res.json(freeBooks)
})       // GET /api/books/free
router.get('/', async (req, res) => {
  const books = await getAllBooks()
  res.json(books)
})            // GET /api/books
router.get('/:id', async (req, res) => {
  const book = await getBookById(req.params.id)
  res.json(book)
})         // GET /api/books/:id

export default router
