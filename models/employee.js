const mongoose = require('mongoose');

/**
 * Sample employee data
 * {
 *     "first_name": "Alice",
 *     "last_name": "Smith",
 *     "email": "alice.smith@example.com",
 *     "salary": 55000,
 *     "gender": "Female"
 *   }
 *  */

const employeeSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        maxlength: 100,
    },
    last_name: {
        type: String,
        required: true,
        maxlength: 50,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        maxlength: 50,
    },
    salary: {
        type: Number,
        required: true,
    },
    gender: {
        type: String,
        required: true,
        maxlength: 25,
    }
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
