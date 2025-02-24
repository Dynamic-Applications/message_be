const db = require("../../config/db");

const findAllUsers = async () => {
    return db.query("SELECT * FROM users");
}

module.exports = {
    findAllUsers,
};