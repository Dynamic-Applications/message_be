const express = require("express");
const Conv = require("./conv-model");
// const { restricted } = require('../auth/auth-middleware');

const router = express.Router();

// Get all conversation
router.get("/", async (req, res) => {
    try {
        const conv = await Conv.findAllConv();
        res.json(conv.rows);
    } catch (err) {
        res.status(500).json({
            message: `Failed to get conversation: ${err.message}`,
        });
    }
});

module.exports = router;