import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';


export const createEmployee = (req, res) => {
    const employees = req.body
        fs.readFile( './employee.json', 'utf-8', (err ,jsonString ) => {
            const data = JSON.parse(jsonString)

            let employeeData = data.filter((employees) => employees.employeeName == req.body.employeeName)
                
            if( employeeData.length > 0 ) {
                    console.log ("Employee already Exists")
                    res.send (`Employee with name ${req.body.employeeName} is already exists in database`)
                }else {
                    data.push({ ...employees, id:uuidv4()})
            fs.writeFile('./employee.json',JSON.stringify(data, null, 2),err =>{
            })
            res.send (`Employee with name ${req.body.employeeName} is added in database`)
        }
    })

}

export const getEmployee = (req, res) => {
    fs.readFile( './employee.json', 'utf-8', (err ,jsonString ) => {
        const data = JSON.parse(jsonString)

         const { id } = req.params;
         let employeeData = data.find((employee) => employee.id == id)
         res.send(employeeData)
    })
}

export const getAllEmployees = (req,res) => {
    fs.readFile( './employee.json', 'utf-8', (err ,jsonString ) => {
        const data = JSON.parse(jsonString)
        res.send(data)
    })
}

export const updateEmployee = (req, res) => {
    fs.readFile('./employee.json' , 'utf-8' , (err, jsonString) => {
        const data = JSON.parse(jsonString)
        const { id } = req.params;
    let employeeData = data.find((employee)=> employee.id == id)
        const {employeeName , experience} = req.body;
            
            if (employeeName) {
                employeeData.employeeName = employeeName;
            } 
            if (experience) {
                employeeData.experience = experience;
            }
            fs.writeFile('./employee.json',JSON.stringify(data,null,2),err=>{
                res.send(`employee with id ${id} has been updated`)
            })
    })
}

export const deleteEmployee = (req, res) => {
    
    const { id } = req.params;
    fs.readFile('./employee.json','utf-8', (err, jsonString)=>{
            const data = JSON.parse(jsonString) 
        let employeeData = data.filter((employee) => employee.id!==id)
        console.log(employeeData)
        fs.writeFile('./employee.json',JSON.stringify(employeeData,null,2),err=>{
        })
    })
     res.send(`Employee with ${id} is deleted from database`)
}
