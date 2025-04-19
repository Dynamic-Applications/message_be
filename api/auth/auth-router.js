require("../auth/google");
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require("../users/users-model");
const { restricted } = require("../auth/auth-middleware");

const router = express.Router();

// Helper: Build token
function buildToken(user) {
    const payload = {
        id: user.id,
        username: user.username,
        email: user.email,
    };
    const options = {
        expiresIn: "30min",
    };
    return jwt.sign(payload, process.env.JWT_SECRET, options);
}

router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 5);
        const result = await User.addUser(username, email, hashedPassword);
        res.status(201).json({
            message: `Welcome to Message, ${result.rows[0].username}`,
        });
    } catch (err) {
        res.status(500).json({
            message: `Failed to sign up: ${err.message}`,
        });
    }
});

router.post("/login", async (req, res, next) => {
    const authError = { message: "Invalid credentials!" };
    try {
        const result = await User.findByUsername(req.body.username);
        const user = result.rows[0];

        if (!user) {
            return res.status(401).json(authError);
        }

        const passwordValid = await bcrypt.compare(
            req.body.password,
            user.password
        );
        console.log("User logged in:", user.username);

        if (!passwordValid) {
            return res.status(401).json(authError);
        }

        const token = buildToken(user);
        res.status(200).json({
            message: `Welcome back, ${user.username}!`,
            token,
        });
    } catch (err) {
        next(err);
    }
});

// Redirect to Google
router.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

// Callback from Google
router.get(
    "/google/callback",
    passport.authenticate("google", {
        failureRedirect: "/login", // Redirect on failure
        session: false, // We don't need a session since we're using JWT
    }),
    (req, res) => {
        try {
            // Generate JWT for the user after successful authentication
            const token = generateJwt(req.user); // User object comes from passport.authenticate

            // Check if the token was successfully generated
            if (!token) {
                return res.status(500).json({ message: "Failed to generate JWT token." });
            }

            // Redirect to frontend with token in URL or as a cookie (you can decide here)
            // Using URL query parameter
            return res.redirect(
                `${process.env.CLIENT_URL}/auth/google/callback?token=${token}`
            );
        } catch (error) {
            console.error("Error during Google OAuth callback:", error);
            return res.status(500).json({ message: "An error occurred during authentication." });
        }
    }
);


router.get("/logout", async (req, res) => {
    try {
        // Log the action (optional, only if you have the username from the session or token)
        console.log("User logged out.");

        // Clear the cookie
        res.clearCookie("token");

        // Respond with a success message
        res.status(200).json({ message: "You have successfully logged out." });
    } catch (error) {
        console.error("Error during logout:", error.message);
        res.status(500).json({ message: "An error occurred during logout." });
    }
});

module.exports = router;
