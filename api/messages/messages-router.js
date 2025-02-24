const express = require("express");
const Messages = require("./messages-model");
// const { restricted } = require('../auth/auth-middleware');

const router = express.Router();

// Get all messages
router.get("/", async (req, res) => {
    try {
        const messages = await Messages.findAllMessages();
        res.json(messages.rows)
    } catch (err) {
        res.status(500).json({
            message: `Failed to get messages: ${err.message}`,
        })
    }
})

module.exports = router;