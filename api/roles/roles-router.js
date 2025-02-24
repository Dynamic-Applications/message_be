const express = require("express");
const Roles = require("./roles-model");
// const { restricted } = require('../auth/auth-middleware');

const router = express.Router();

// Get all roles
router.get("/", async (req, res) => {
    try {
        const roles = await Roles.findAllRoles();
        res.json(roles.rows);
    } catch (err) {
        res.status(500).json({
            message: `Failed to get roles: ${err.message}`,
        });
    }
});

module.exports = router;
