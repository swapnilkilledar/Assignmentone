import express from 'express'
import {createUsers, login, getProfile,updateProfile,changePassword } from '../controllers/users.js'; 
import {authenticateToken} from '../middlewares.js'
const router = express.Router();


router.post('/registration', createUsers)
router.post('/login' , login)
router.get('/profile' , authenticateToken, getProfile)
router.put('/profile', authenticateToken, updateProfile)
router.post('/changePassword',authenticateToken, changePassword )

export default router;



