const db = require("../../config/db");

const findAllMessages = async () => {
    return db.query("SELECT * FROM messages")
}

module.exports = {
    findAllMessages,
}