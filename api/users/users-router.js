const express = require("express");
const multer = require("multer");
const Users = require("./users-model");
const { restricted } = require("../auth/auth-middleware"); // Changed from authenticateToken to restricted

const router = express.Router();

// Configure multer for memory storage
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
    },
    fileFilter: (req, file, cb) => {
        // Accept only image files
        if (file.mimetype.startsWith("image/")) {
            cb(null, true);
        } else {
            cb(new Error("Only image files are allowed"));
        }
    },
});

// Get all users
router.get("/", restricted, async (req, res) => {
    try {
        const users = await Users.findAllUsers();
        res.json(users.rows);
    } catch (err) {
        res.status(500).json({
            message: `Failed to get users: ${err.message}`,
        });
    }
});

// Get user by ID
router.get("/:id", async (req, res) => {
    try {
        const user = await Users.findById(req.params.id);
        if (!user.rows.length) {
            return res.status(404).json({
                message: "User not found",
            });
        }
        res.json(user.rows[0]);
    } catch (err) {
        res.status(500).json({
            message: `Failed to get user: ${err.message}`,
        });
    }
});

// Create a new user
router.post("/", async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const hashedPassword = await Users.hashPassword(password);
        const newUser = await Users.addUser(username, email, hashedPassword);
        res.status(201).json(newUser.rows[0]);
    } catch (err) {
        res.status(500).json({
            message: `Failed to create user: ${err.message}`,
        });
    }
});

// Update user
router.put("/:id", async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const updatedUser = await Users.updateUser(
            req.params.id,
            username,
            email,
            password
        );
        if (!updatedUser.rows.length) {
            return res.status(404).json({
                message: "User not found",
            });
        }
        res.json(updatedUser.rows[0]);
    } catch (err) {
        res.status(500).json({
            message: `Failed to update user: ${err.message}`,
        });
    }
});

// Delete user
router.delete("/:id", async (req, res) => {
    try {
        const deletedUser = await Users.deleteUser(req.params.id);
        if (!deletedUser.rows.length) {
            return res.status(404).json({
                message: "User not found",
            });
        }
        res.json(deletedUser.rows[0]);
    } catch (err) {
        res.status(500).json({
            message: `Failed to delete user: ${err.message}`,
        });
    }
});

// Get user profile
router.get("/profile", restricted, async (req, res) => {
    try {
        console.log("REQ.USER:", req.user);
        const profile = await Users.getProfile(Number(req.user.id));

        if (!profile.rows.length) {
            return res.status(404).json({
                message: "Profile not found",
            });
        }

        const userProfile = profile.rows[0];
        delete userProfile.password;

        res.json(userProfile);
    } catch (err) {
        res.status(500).json({
            message: `Failed to get profile: ${err.message}`,
        });
    }
});

// Update user profile
router.put("/profile/:id", restricted, async (req, res) => {
    try {
        const { avatar, status, phone, location, bio, interests } = req.body;

        const updatedProfile = await Users.updateProfile(req.user.id, {
            avatar,
            status,
            phone,
            location,
            bio,
            interests: Array.isArray(interests) ? interests : null,
        });

        if (!updatedProfile.rows.length) {
            return res.status(404).json({
                message: "Profile not found",
            });
        }

        // Remove sensitive information
        const userProfile = updatedProfile.rows[0];
        delete userProfile.password;

        res.json(userProfile);
    } catch (err) {
        res.status(500).json({
            message: `Failed to update profile: ${err.message}`,
        });
    }
});

// Upload avatar
router.post(
    "/profile/avatar",
    restricted,
    upload.single("avatar"),
    async (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).json({ message: "No file uploaded" });
            }

            // Get the file buffer and mime type
            const avatarBuffer = req.file.buffer;
            const mimeType = req.file.mimetype;

            const result = await Users.updateAvatar(
                req.user.id,
                avatarBuffer,
                mimeType
            );

            if (!result.rows.length) {
                return res.status(404).json({
                    message: "Profile not found",
                });
            }

            res.json({
                message: "Avatar uploaded successfully",
                user: result.rows[0],
            });
        } catch (err) {
            res.status(500).json({
                message: `Failed to update avatar: ${err.message}`,
            });
        }
    }
);

// Get avatar
router.get("/profile/avatar", restricted, async (req, res) => {
    try {
        const result = await Users.getAvatar(req.user.id);

        if (!result.rows.length || !result.rows[0].avatar) {
            return res.status(404).json({
                message: "Avatar not found",
            });
        }

        const { avatar, avatar_type } = result.rows[0];

        // Set the correct content type
        res.setHeader("Content-Type", avatar_type);
        // Send the binary data
        res.send(avatar);
    } catch (err) {
        res.status(500).json({
            message: `Failed to get avatar: ${err.message}`,
        });
    }
});

module.exports = router;
