const jwt = require("jsonwebtoken");

// AUTHENTICATION MIDDLEWARE
const restricted = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log("Authorization Header:", authHeader); // Log the header

    if (!authHeader) {
        console.log("No token found in headers");
        return res.status(401).json({ message: "Token required" });
    }

    let token;
    if (authHeader.startsWith("Bearer ")) {
        token = authHeader.split("Bearer ").pop().trim();
    } else {
        token = authHeader;
    }

    console.log("Extracted Token:", token); // Log the token

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.log("JWT Verification Error:", err); // Log the error
            return res.status(401).json({ message: "Token invalid" });
        }

        console.log("Decoded Token:", decoded); // Log the decoded token

        if (!decoded || !decoded.id) {
            console.log("Decoded token missing user id:", decoded);
            return res.status(403).json({ message: "Invalid token structure" });
        }

        req.user = decoded;
        next();
    });
};

// AUTHORIZATION MIDDLEWARE
const checkRole = (role) => (req, res, next) => {
    if (req.user && req.user.role === role) {
        next();
    } else {
        res.status(403).json({ message: "You are not authorized!" });
    }
    // return (req, res, next) => {
    //     if (req.session.user && req.session.user.role === role) {
    //         next();
    //     } else {
    //         res.status(403).json({ message: "You are not authorized!" });
    //     }
    // };
};

module.exports = {
    restricted,
    checkRole,
};
