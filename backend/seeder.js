// seeder.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Book from './models/bookModel.js'; // Adjust path if needed
import { freeLibrary } from './data/freeLibrary.js'; // Your list of books

dotenv.config();

const seedBooks = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await Book.deleteMany(); // Clears old data
    const createdBooks = await Book.insertMany(freeLibrary);
    await Book.insertMany(freeLibrary);

    console.log(`📚 ${createdBooks.length} books inserted.`);
    process.exit();
  } catch (error) {
    console.error('❌ Seeder Error:', error);
    process.exit(1);
  }
};

seedBooks();
