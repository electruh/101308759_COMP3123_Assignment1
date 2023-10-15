//initializing var here 
const express = require("express");
const mongoose = require("mongoose");
const routes = express.Router()
//connects routes to model
const employeeModel = require("../models/employee")

//gets all employee list
routes.get('/employees',async(request,response) =>{

    try{
        const employee = await employeeModel.find()
        response.status(200).json(employee);
    }catch(error){
        response.status(500).json({message:error.message});
    }
})

//POST /api/emp/employees
routes.post('/employees', async (request, response) => {
    try {
        const employeesData = request.body;
        const createdEmployees = [];

        for (const employeeData of employeesData) {
            const employee = new employeeModel(employeeData);
            const createdEmployee = await employee.save();
            createdEmployees.push(createdEmployee);
        }

        response.status(201).json(createdEmployees);
    } catch (error) {
        response.status(400).json({ message: error.message });
    }
});

//GET - Gettign employee through ID
routes.get('/employees/:empID',async(request,response) =>{
    try{
        const getEmployee = await employeeModel.findById(request.params.empID,request.body)
        response.send(getEmployee)
    }catch(error){
        response.status(400).json({message:error.message});
    }
});
//Updating employee
routes.put('/employees/:empID', async (request, response) => {
    try {
        const empID = request.params.empID;
        const updatedFields = request.body;

        const employee = await employeeModel.findByIdAndUpdate(empID, updatedFields, { new: true });

        if (!employee) {
            return response.status(404).json({ status: false, message: "Employee not found" });
        }

        const changes = Object.entries(updatedFields).map(([key, value]) => `${key} changed to ${value}`);

        response.status(200).json({
            status: true,
            message: changes.join(', ')
        });
    } catch (error) {
        response.status(500).json({ status: false, message: error.message });
    }
});



//Deleting an employee
routes.delete("/employees/:empID", async (request, response) => {
    try {
        const empID = request.params.empID;
        const employee = await employeeModel.findById(empID);

        if (!employee) {
            return response.status(404).json({ status: false, message: "Employee not found" });
        }

        const deletedEmployeeName = `${employee.first_name} ${employee.last_name}`;
        await employeeModel.findByIdAndDelete(empID);

        response.json({ status: true, message: `${deletedEmployeeName} deleted successfully` });
    } catch (error) {
        response.status(400).json({ status: false, message: error.message });
    }
});


module.exports = routes