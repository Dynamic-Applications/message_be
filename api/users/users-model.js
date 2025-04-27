const db = require("../../config/db");

const findAllUsers = async () => {
    return db.query("SELECT * FROM users");
};

const findById = async (id) => {
    return db.query("SELECT * FROM users WHERE id = $1", [id]);
};

const findByUsername = async (username) => {
    return db.query("SELECT * FROM users WHERE username = $1", [username]);
};

async function findByEmail(email) {
    return db.query("SELECT * FROM users WHERE email = $1", [email]);
}

const addUser = async (username, email, password) => {
    return db.query(
        "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
        [username, email, password]
    );
};

const updateUser = async (id, username, email, password) => {
    return db.query(
        "UPDATE users SET username = $1, email = $2, password = $3 WHERE id = $4 RETURNING *",
        [username, email, password, id]
    );
};

const deleteUser = async (id) => {
    return db.query("DELETE FROM users WHERE id = $1 RETURNING *", [id]);
};

const updateResetToken = async (email, resetTokenHash, resetTokenExpiry) => {
    return db.query(
        "UPDATE users SET reset_password_token = $1, reset_password_token_expires = $2 WHERE email = $3 RETURNING *",
        [resetTokenHash, resetTokenExpiry, email]
    );
};

const updateProfile = async (id, profileData) => {
    const { avatar, status, phone, location, bio, interests } = profileData;

    return db.query(
        `UPDATE users 
         SET avatar = COALESCE($1, avatar),
             status = COALESCE($2, status),
             phone = COALESCE($3, phone),
             location = COALESCE($4, location),
             bio = COALESCE($5, bio),
             interests = COALESCE($6, interests)
         WHERE id = $7 
         RETURNING *`,
        [avatar, status, phone, location, bio, interests, id]
    );
};

const getProfile = async (id) => {
    return db.query(
        `SELECT id, username, email, avatar, status, phone, 
                location, bio, interests, joined_date 
         FROM users 
         WHERE id = $1`,
        [id]
    );
};

module.exports = {
    findAllUsers,
    findById,
    findByUsername,
    findByEmail,
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
    updateProfile,
    getProfile,
};
