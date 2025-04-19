require("dotenv").config(); // Load env variables

const server = require("./server");
const { createServer } = require("http");
const { Server } = require("socket.io");

const socketHandler = require("./socketHandler"); // 👈 New handler file

const port = process.env.PORT || 4500;
const httpServer = createServer(server);

const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true,
    },
});

// Use socket auth and handlers
socketHandler(io);

httpServer.listen(port, () => {
    console.log(`listening on port ${port}`);
});