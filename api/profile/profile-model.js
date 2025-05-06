const db = require("../../config/db");

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

const getAllProfiles = async () => {
    return db.query(
        `SELECT id, username, email, avatar, status, phone, 
                location, bio, interests, joined_date 
         FROM users`
    );
}

const getProfile = async (id) => {
    return db.query(
        `SELECT id, username, email, avatar, status, phone, 
                location, bio, interests, joined_date 
         FROM users 
         WHERE id = $1`,
        [id]
    );
};

const updateAvatar = async (id, avatarBuffer, mimeType) => {
    return db.query(
        `UPDATE users 
         SET avatar = $1, 
             avatar_type = $2
         WHERE id = $3 
         RETURNING id, username, email, avatar_type`,
        [avatarBuffer, mimeType, id]
    );
};

const getAvatar = async (id) => {
    return db.query(
        `SELECT avatar, avatar_type 
         FROM users 
         WHERE id = $1`,
        [id]
    );
};

module.exports = {
    updateProfile,
    getProfile,
    getAllProfiles,
    updateAvatar,
    getAvatar,
};
