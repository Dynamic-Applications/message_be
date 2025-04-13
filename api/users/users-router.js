const express = require("express");
const Users = require("./users-model");
// const { restricted } = require('../auth/auth-middleware');

const router = express.Router();

// Get all users
router.get("/", async (req, res) => {
    try {
        const users = await Users.findAllUsers();
        res.json(users.rows);
    } catch (err) {
        res.status(500).json({
            message: `Failed to get users: ${err.message}`,
        });
    }
});

// Get user by ID
router.get("/:id", async (req, res) => {
    try {
        const user = await Users.findById(req.params.id);
        if (!user.rows.length) {
            return res.status(404).json({
                message: "User not found",
            });
        }
        res.json(user.rows[0]);
    } catch (err) {
        res.status(500).json({
            message: `Failed to get user: ${err.message}`,
        });
    }
});

// Create a new user
router.post("/", async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const hashedPassword = await Users.hashPassword(password);
        const newUser = await Users.addUser(username, email, hashedPassword);
        res.status(201).json(newUser.rows[0]);
    } catch (err) {
        res.status(500).json({
            message: `Failed to create user: ${err.message}`,
        });
    }
});

// Update user
router.put("/:id", async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const updatedUser = await Users.updateUser(
            req.params.id,
            username,
            email,
            password
        );
        if (!updatedUser.rows.length) {
            return res.status(404).json({
                message: "User not found",
            });
        }
        res.json(updatedUser.rows[0]);
    } catch (err) {
        res.status(500).json({
            message: `Failed to update user: ${err.message}`,
        });
    }
});

// Delete user
router.delete("/:id", async (req, res) => {
    try {
        const deletedUser = await Users.deleteUser(req.params.id);
        if (!deletedUser.rows.length) {
            return res.status(404).json({
                message: "User not found",
            });
        }
        res.json(deletedUser.rows[0]);
    } catch (err) {
        res.status(500).json({
            message: `Failed to delete user: ${err.message}`,
        });
    }
});

module.exports = router;
