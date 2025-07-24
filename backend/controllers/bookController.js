import Book from '../models/bookModel.js'

// @desc    Get all free books
// @route   GET /api/books/free
export const getFreeBooks = async (req, res) => {
  try {
    const books = await Book.find({ isFree: true })
    res.json(books)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching free books' })
  }
}

// @desc    Get all books
// @route   GET /api/books
export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find()
    res.json(books)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books' })
  }
}

// @desc    Get a single book by ID
// @route   GET /api/books/:id
export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
    if (!book) {
      return res.status(404).json({ message: 'Book not found' })
    }
    res.json(book)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching book' })
  }
}

// @desc    Get all preview books
// @route   GET /api/books/preview
export const getPreviewBooks = async (req, res) => {
  try {
    const previewBooks = await Book.find({ isPreview: true })
    res.json(previewBooks)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching preview books' })
  }
}

