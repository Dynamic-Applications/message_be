const db = require("../../config/db");

const findAllRoles = async () => {
    return db.query("SELECT * FROM roles")
}

module.exports = {
    findAllRoles,
}