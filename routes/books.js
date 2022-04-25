import express from 'express'

import{createBook, getBook,editBook, deleteBook, getAllBooks} from '../controllers/books.js'
const router = express.Router();

router.post ('/book', createBook)
router.get ('/book/:id', getBook)
router.get('/book', getAllBooks)
router.put('/book/:id', editBook)
router.delete('/book/:id', deleteBook)

export default router; 
