import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';




export const createBook = (req,res) =>{
        const book =req.body
        fs.readFile('./book.json','utf-8',(err, jsonString)=>{
            console.log(jsonString)
            const data = JSON.parse(jsonString)
            let bookUser = data.filter((user)=>user.name == req.body.name)
                if (bookUser.length > 0) {
                    console.log("Book Already Exists")
                    res.send(`Book with name ${req.body.name} is already exists in Liabrary`)
                } else {
                    data.push( {...book, id:uuidv4()}) 
                    fs.writeFile('./book.json', JSON.stringify( data ,null, 2),err=> {
                    })
                    res.send(`Book with name ${req.body.name} is added in Liabrary`)
                }
        })
}

export const getBook =(req, res) =>{
        const { id } = req.params;
        fs.readFile('./book.json','utf-8',(err, jsonString) => {
        const data = JSON.parse(jsonString)
        let bookUser = data.find((book)=>book.id == id)
           
                res.send(bookUser)
            
    })
            
}




export const editBook = (req, res) =>{
    fs.readFile('./book.json','utf-8',(err,jsonString)=>{
    const data = JSON.parse(jsonString)
    const { id }= req.params
    let bookUser = data.find((book) => book.id == id)
    const{name, author, publication ,price}= req.body;

        if(name){
            bookUser.name = name;
        }
        if (author){
            bookUser.author = author;
        }
        if(publication){
            bookUser.publication = publication
        }
        if(price){
            bookUser.price = price
        }
        fs.writeFile('./book.json',JSON.stringify(data,null,2),err=>{
        res.send(`book with id ${id} has been edited`)
        })
    })
}


export const deleteBook =(req, res) =>{
const { id } = req.params
fs.readFile('./book.json','utf-8',(err, jsonString)=>{
    const data = JSON.parse(jsonString)
    let bookUser = data.filter((book)=>book.id!==id)
    fs.writeFile('./book.json',JSON.stringify(bookUser,null,2),err=>{

    })
})
        res.send(`Book with ${id} has been deleted from database`)

}


export const getAllBooks = (req,res) => {
    fs.readFile('./book.json','utf-8',(err, jsonString)=>{
        const data = JSON.parse(jsonString)
    res.send(data)
    })
}