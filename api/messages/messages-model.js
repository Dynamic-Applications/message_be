const db = require("../../config/db");

const findAllMessages = async () => {
    return db.query(`
        SELECT 
            m.id, m.text, m.created_at,
            u.id AS user_id, u.username
        FROM messages m
        JOIN users u ON m.user_id = u.id
        ORDER BY m.created_at ASC;
    `);
};

const addMessage = async (user_id, content) => {
    return db.query(
        `
        INSERT INTO messages (user_id, text)
        VALUES ($1, $2)
        RETURNING *;
        `,
        [user_id, content]
    );
};


module.exports = {
    findAllMessages,
    addMessage,
};
