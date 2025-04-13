const db = require("../../config/db");

const findAllUsers = async () => {
    return db.query("SELECT * FROM users");
}

const findById = async (id) => {
    return db.query("SELECT * FROM users WHERE id = $1", [id]);
}

const findByUsername = async (username) => {
    return db.query("SELECT * FROM users WHERE username = $1", [username]);
}

const addUser = async (username, email, password) => {
    return db.query(
        "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
        [username, email, password]
    );
}

const updateUser = async (id, username, email, password) => {
    return db.query(
        "UPDATE users SET username = $1, email = $2, password = $3 WHERE id = $4 RETURNING *",
        [username, email, password, id]
    );
}

const deleteUser = async (id) => {
    return db.query("DELETE FROM users WHERE id = $1 RETURNING *", [id]);
}

const updateResetToken = async (email, resetTokenHash, resetTokenExpiry) => {
    return db.query(
        "UPDATE users SET reset_password_token = $1, reset_password_token_expires = $2 WHERE email = $3 RETURNING *",
        [resetTokenHash, resetTokenExpiry, email]
    );
}

module.exports = {
    findAllUsers,
    findById,
    findByUsername,
    addUser,
    updateUser,
    deleteUser,
    updateResetToken,
    // resetPassword,
    // findByResetToken,
    // generateResetToken,
    // updatePassword,
    // findByEmail,
    // findByResetToken,
};