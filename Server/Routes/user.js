const express = require("express");
const user = express.Router();
const usermodel = require("../Model/user");

user.get('/users', async (req, res, next) => {
    try {
        const users = await usermodel.find();
        res.json(users);
    } catch (error) {
        console.error("🔥 Error fetching users:", error);
        res.status(500).json({ message: "Error fetching users" });
    }
});

user.get('/users/:id', async (req, res) => {
    try {
        const user = await usermodel.findById(req.params.id); // Fixed reference

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

user.post('/users', async (req, res, next) => {
    try {
        const newUser = await usermodel.create(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

user.put('/users/:id', async (req, res, next) => {
    try {
        const updatedUser = await usermodel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(updatedUser);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

user.delete('/users/:id', async (req, res, next) => {
    try {
        const deletedUser = await usermodel.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = user;
