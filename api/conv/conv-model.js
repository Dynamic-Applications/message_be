const db = require("../../config/db");

const findAllConv = async () => {
    return db.query("SELECT * FROM conv")
}

module.exports = {
    findAllConv,
};