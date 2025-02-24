const express = require("express");
const ConvUsers = require("./conv-users-model");
// const { restricted } = require('../auth/auth-middleware');

const router = express.Router();

// Get all conversation from users
router.get("/", async (req, res) => {
    try {
        const convUsers = await ConvUsers.findAllConvUsers();
        res.json(convUsers.rows);
    } catch (err) {
        res.status(500).json({
            message: `Failed to get conversation from users: ${err.message}`,
        });
    }
});

module.exports = router;