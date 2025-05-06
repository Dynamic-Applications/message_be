const express = require("express");
const multer = require("multer");
const Profiles = require("./profile-model");
const { restricted } = require("../auth/auth-middleware"); // Changed from authenticateToken to restricted

const router = express.Router();

// Get user profile
router.get("/", restricted, async (req, res) => {
    try {
        console.log("REQ.USER:", req.user);
        const profile = await Profiles.getProfile(Number(req.user.id));

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
router.put("/:id", async (req, res) => {
    try {
        const { avatar, status, phone, location, bio, interests } = req.body;

        const updatedProfile = await Profiles.updateProfile(req.user.id, {
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

// Upload avatar
router.post(
    "/avatar",
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

            const result = await Profiles.updateAvatar(
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
router.get("/avatar", restricted, async (req, res) => {
    try {
        const result = await Profiles.getAvatar(req.user.id);

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
