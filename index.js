const http = require("http");
const socketIo = require("socket.io");
const server = require("./server");
const db = require("./config/db");

const port = process.env.PORT || 6000;

// Create HTTP server from Express app
const app = http.createServer(server);

// Attach Socket.IO
const io = socketIo(app, {
    cors: {
        origin: ["http://localhost:3000", process.env.UI_URL_PROD],
        methods: ["GET", "POST"],
        credentials: true,
    },
});

// Real-time chat logic
io.on("connection", (socket) => {
    console.log(`🟢 Client connected: ${socket.id}`);

    socket.on("chat message", async (msg) => {
        try {
            const result = await db.query(
                "INSERT INTO messages (username, content) VALUES ($1, $2) RETURNING *",
                [msg.username, msg.content]
            );

            const savedMessage = result.rows[0];

            // Broadcast to all clients
            io.emit("chat message", savedMessage);
        } catch (err) {
            console.error("❌ Failed to save message:", err.message);
            socket.emit("error", { message: "Failed to save message." });
        }
    });

    socket.on("disconnect", () => {
        console.log(`🔴 Client disconnected: ${socket.id}`);
    });
});

// Start server
app.listen(port, () => {
    console.log(`🚀 Server listening on port ${port}`);
});
