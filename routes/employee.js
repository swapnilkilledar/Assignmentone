import express from 'express'
import{createEmployee, getEmployee , getAllEmployees , updateEmployee , deleteEmployee} from '../controllers/employee.js'
const router = express.Router();

router.post('/createUser', createEmployee )
router.get ('/getUser/:id', getEmployee )
router.get('/getUsers',getAllEmployees )
router.put('/updateUser/:id', updateEmployee )
router.delete('/deleteUser/:id', deleteEmployee )

export default router;