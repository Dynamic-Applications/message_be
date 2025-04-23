const jwt = require("jsonwebtoken");
const Messages = require("./api/messages/messages-model");

module.exports = function socketHandler(io) {
    io.use((socket, next) => {
        const token = socket.handshake.auth?.token;
        if (!token) {
            return next(new Error("Authentication error"));
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            socket.user = decoded; // attach user data to socket
            next();
        } catch (err) {
            console.error("JWT error:", err.message);
            return next(new Error("Authentication failed"));
        }
    });

    io.on("connection", (socket) => {
        const username = socket.user?.username || socket.id.substring(0, 5);
        const user_id = socket.user?.id;
        if (!user_id) {
            console.error("No user ID on socket. Auth may have failed.");
            return;
        }
        console.log(`${username} connected`);

        // socket.emit("message", `Welcome to Chat App, ${username}!`);
        // socket.broadcast.emit("message", `${username} connected`);

        socket.on("message", async (data) => {
            const content = data.trim();
            if (!content) return;

            try {
                // Save message to DB
                const result = await Messages.addMessage(user_id, content);
                const saved = result.rows[0];

                // Broadcast the saved message
                io.emit("message", {
                    id: saved.id,
                    user_id: saved.user_id,
                    username,
                    text: saved.text,
                    created_at: saved.created_at,
                });
            } catch (err) {
                console.error("Failed to save message:", err.message);
                socket.emit("error", "Message could not be saved.");
            }
        });

        // socket.on("activity", () => {
        //     socket.broadcast.emit("activity", `${username}`);
        // });

        // socket.on("disconnect", () => {
        //     socket.broadcast.emit("message", `${username} disconnected`);
        // });
    });
};
