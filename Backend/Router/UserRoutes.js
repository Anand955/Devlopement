const express = require('express');
const User = require('../Modals/Usermodel'); 
const router = express.Router();

// Create a new user
router.post("/", async (req, res) => {
    const { name, email, age } = req.body;

    try {
        const userAdded = await User.create({ name, email, age });
        res.status(201).json(userAdded);
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.error(error);
    }
});

// Get all users
router.get("/", async (req, res) => {
    try {
        const showAll = await User.find();
        res.status(200).json(showAll);
    } catch (error) {
        res.status(404).json({ error: error.message });
        console.error(error);
    }
});

// Get single user
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const singleUser = await User.findById(id);
        if (!singleUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(singleUser);
    } catch (error) {
        res.status(404).json({ error: error.message });
        console.error(error);
    }
});

// Delete a user
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(deletedUser);
    } catch (error) {
        res.status(404).json({ error: error.message });
        console.error(error);
    }
});


// Update a user
router.patch("/:id", async (req, res) => {
    const { id } = req.params;
    const { name, email, age } = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(id, { name, email, age }, { new: true, runValidators: true });
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.error(error);
    }
});

module.exports = router; // Export the router
