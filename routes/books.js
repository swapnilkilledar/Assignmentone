import express from 'express'

import{createBook, getBook,editBook, deleteBook, getAllBooks, queryCase} from '../controllers/books.js'
import{authenticateUser} from'../middlewares.js'
const router = express.Router();

router.post ('/book',authenticateUser, createBook)
router.get ('/book/:id', getBook)
router.get('/book', getAllBooks)
router.put('/book/:id', editBook)
router.delete('/book/:id', deleteBook)
router.get('/query',queryCase)

export default router; 
