import express from 'express'
import fs from 'fs'
import jwt from 'jsonwebtoken'
const secret ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiJzd2FwbmlsIiwibGFzdE5hbWUiOiJraWxsZWRhciIsImVtYWlsIjoia3N3YXBuaWxAZ21haWwuY29tIiwicGFzc3dvcmQiOiIxMjM0NTYiLCJiaXJ0aERhdGUiOiIxNS8wOC8xOTkwIiwiaWF0IjoxNjUwNDc3MjgwfQ.I8ZnWF_rBeVWFe-77nX-uBzdMJB0esYWFQIzR1ACIHg'

export function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    console.log(token)
    if (token == null) {
        return res.sendStatus(401)
    } else {
        jwt.verify(token, secret, (err, user)=> {
            if (err) {
                return res.sendStatus(403)
            }
        req.user=user
        next()
        })
    }
} 

 export function authenticateUser (req, res ,next){
    fs.readFile('./users.json', 'utf-8', (err, jsonString)=>{
        const data = JSON.parse(jsonString)
    const users = req.data.isAdmin
      if(users == "True"){
          next()
      } else  {
          console.log("user is not a admin")
         // res.send(req.data.isAdmin)
      }      
 
 })
}