const mongoose = require('mongoose');
/**
 * Sample user data
 * {
 *   "username": "Allanis",
 *   "email": "allanissumaya@example.com",
 *   "password": "userpassword"
 * }
 *  */
// Creating a schema to store the objects
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        primaryKey: true,
        maxlength: 100,
    },
    email: {
        type: String,
        required: true,
        maxlength: 50,
    },
    password: {
        type: String,
        required: true,
        unique: true,
        maxlength: 50,
    },
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
