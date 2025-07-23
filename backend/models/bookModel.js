import mongoose from 'mongoose'

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      
    },
    author: String,
    description: String,
    genre: String,
    coverImage: String,
    isFree: {
      type: Boolean,
      default: false,
    },
    fileUrl: String, // link to PDF or reader
  },
  {
    timestamps: true,
  }
)

const Book = mongoose.model('Book', bookSchema)
export default Book
