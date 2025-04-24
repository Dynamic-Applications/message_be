const express = require("express");
const Messages = require("./messages-model");
// const { restricted } = require('../auth/auth-middleware');

const router = express.Router();

// Get all messages
router.get("/", async (req, res) => {
    try {
        const messages = await Messages.findAllMessages();
        res.json(messages.rows);
    } catch (err) {
        res.status(500).json({
            message: `Error fetching messages: ${err.message}`,
        });
    }
});

// Update a message
router.put("/:id", async (req, res) => {
    const { text } = req.body;

    try {
        const updatedMessage = await Messages.updateMessage(req.params.id, text);
        if (!updatedMessage.rowCount) {
            return res.status(404).json({
                message: "Message not found",
            });
        }
        res.json(updatedMessage.rows[0]);
    } catch (err) {
        res.status(500).json({
            message: `Error updating message: ${err.message}`,
        });
    }
});

// Delete a message
router.delete("/:id", async (req, res) => {
    try {
        const deletedMessage = await Messages.deleteMessage(req.params.id);
        if (!deletedMessage.rowCount) {
            return res.status(404).json({
                message: "Message not found",
            });
        }
        res.status(204).end();
    } catch (err) {
        res.status(500).json({
            message: `Error deleting message: ${err.message}`,
        });
    }
});

module.exports = router;