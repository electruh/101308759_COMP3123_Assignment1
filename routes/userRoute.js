const express = require("express");
const routes = express.Router();
const userModel = require("../models/user");

// User Signup
routes.post('/signup', async (request, response) => {
    try {
        const { username, email, password } = request.body;

        // Check if the username or email already exists
        const existingUser = await userModel.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return response.status(409).json({ message: "Username or email already exists" });
        }

        const newUser = new userModel({ username, email, password });
        await newUser.save();

        response.status(201).json(newUser);
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
});

// User Login
routes.post('/login', async (request, response) => {
    try {
        const { username, password } = request.body;

        const user = await userModel.findOne({ username })
        if (!user) {
            return response.status(404).json({ status: false, message: "User not found" });
        }
        if (user.password !== password) {
            return response.status(401).json({ status: false, message: "Incorrect password" });
        }
        response.status(200).json({
            status: true,
            username: user.username,
            message: "User logged in successfully"
        });
    } catch (error) {
        response.status(500).json({ status: false, message: error.message });
    }
});


module.exports = routes;
