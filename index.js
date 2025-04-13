const db = require("./config/db");
const http = require("http");
const socketIo = require("socket.io");
const expressApp = require("./server"); // your Express app (server.js)

const port = process.env.PORT || 6000;

// Create HTTP server from Express app
const app = http.createServer(expressApp);

// Attach Socket.IO
const io = socketIo(app, {
    cors: {
        origin: [
            "http://localhost:3000", // Development frontend URL
            process.env.UI_URL_PROD, // Production frontend URL (e.g., https://your-frontend.com)
        ],
        methods: ["GET", "POST"],
        credentials: true,
    },
});

// Real-time chat logic
io.on("connection", (socket) => {
    console.log(`🟢 Client connected: ${socket.id}`);

   socket.on("chat message", async (msg) => {
       try {
           // Assuming msg has: { user_id, conv_id, content }
           const result = await db.query(
               "INSERT INTO messages (user_id, conv_id, content, sent_at) VALUES ($1, $2, $3, NOW()) RETURNING *",
               [msg.user_id, msg.conv_id, msg.content]
           );
           const savedMessage = result.rows[0];

           // Broadcast to all connected clients
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
