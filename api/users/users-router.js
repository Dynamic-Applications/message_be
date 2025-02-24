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

module.exports = router;
