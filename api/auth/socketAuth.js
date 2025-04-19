const jwt = require("jsonwebtoken");

const authenticateSocket = (socket, next) => {
    const token = socket.handshake.auth.token;

    if (!token) {
        return next(new Error("Authentication error: No token provided"));
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return next(new Error("Authentication error: Token invalid"));
        }

        socket.user = decoded; // This must include user.id!
        next();
    });
};

module.exports = authenticateSocket;
