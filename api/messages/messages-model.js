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

// Edit a message
const updateMessage = async (id, content) => {
    return db.query(
        `
        UPDATE messages
        SET text = $1
        WHERE id = $2
        RETURNING *;
        `,
        [content, id]
    );
};

// Delete a message
const deleteMessage = async (id) => {
    return db.query(
        `
        DELETE FROM messages
        WHERE id = $1
        RETURNING *;
        `,
        [id]
    );
};


module.exports = {
    findAllMessages,
    addMessage,
    updateMessage,
    deleteMessage,
};
