
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import jwt from 'jsonwebtoken'


const secret ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiJzd2FwbmlsIiwibGFzdE5hbWUiOiJraWxsZWRhciIsImVtYWlsIjoia3N3YXBuaWxAZ21haWwuY29tIiwicGFzc3dvcmQiOiIxMjM0NTYiLCJiaXJ0aERhdGUiOiIxNS8wOC8xOTkwIiwiaWF0IjoxNjUwNDc3MjgwfQ.I8ZnWF_rBeVWFe-77nX-uBzdMJB0esYWFQIzR1ACIHg'

export const createUsers = (req, res)=> {
    const userRegister = req.body;
    fs.readFile('./users.json', 'utf-8', (err, jsonString)=> {
         const data = JSON.parse(jsonString)
         let usersData = data.filter((user)=>user.email == req.body.email);   
        if(usersData.length > 0) {
            console.log("User already Exist")
            res.send(`user with email ${req.body.email} is already exists in Database`)
        }
        else {
            data.push( {...userRegister,id:uuidv4()})  
           
            fs.writeFile('./users.json', JSON.stringify(data ,null, 2),err=> {
            if(err) {
                console.log(err)
            }
            })
            res.send(`user with email${req.body.email} is added in Database`)
        }
    })
}

 export const login= (req, res) => {
  fs.readFile('./users.json', 'utf-8', (err, jsonString) => {
        const data = JSON.parse(jsonString)
        let usersData = data.filter((user)=> user.email == req.body.email );   
        if(usersData.length > 0) {
            if (usersData[0].password == req.body.password) {
                const accessToken = jwt.sign(usersData[0], secret)
                res.json({ accessToken: accessToken})
            }   else {
                res.send(`Incorrect Password`)
                }
        } else {
        res.send(`user with email ${req.body.email} does not exist`)
        }
    })
}
 


export const getProfile = (req, res) => {
    res.send(req.user)
} 

export const updateProfile =(req, res) => {
    fs.readFile('./users.json', 'utf-8', (err, jsonString)=> {
        const users = JSON.parse(jsonString)
        let usersData = users.filter((user)=> user.id == req.user.id ); 
        const{firstName, lastName, birthDate} = req.body;
    
        if(firstName){
            usersData[0].firstName = firstName;
        }
        if(lastName){
            usersData[0].lastName = lastName;
        }
        if(birthDate){
            usersData[0].birthDate = birthDate;
        }

        fs.writeFile('./users.json', JSON.stringify(users, null, 2),err=> {
        res.send(`user with id ${req.user.id} has been updated`)
        })
    })
}
export const changePassword = (req, res) =>{
    fs.readFile('./users.json', 'utf-8', (err, jsonString)=> {
        const users = JSON.parse(jsonString)
        let usersData = users.filter((user)=> user.id == req.user.id ); 
        const{password} = req.body;
    
        if(password){
            usersData[0].password = password;
        }
       

        fs.writeFile('./users.json', JSON.stringify(users, null, 2),err=> {
        res.send(`user with id ${req.user.id} has been updated`)
        })
    })

}

