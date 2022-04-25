import express from 'express'
import bodyParser from 'body-parser'
import usersRouts from './routes/users.js'
import bookRouts from './routes/books.js'

const app = express()
const PORT = 5000;
app.use(express.json())



app.use(bodyParser.json());

app.use('/users', usersRouts);
app.use('/books', bookRouts)


app.listen(PORT, ()=>console.log(`server is running on PORT :http://localhost${PORT}` ))