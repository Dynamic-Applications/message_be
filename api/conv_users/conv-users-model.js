const db = require("../../config/db");

const findAllConvUsers = async () => {
    return db.query("SELECT * FROM conv_users")
}

module.exports = {
    findAllConvUsers,
};