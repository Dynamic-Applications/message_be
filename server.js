const express = require("express");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
require("dotenv").config();
require("./api/auth/passport");
require("./cron/cleanupMessages");

// Require the routes
const welcomeRouter = require("./api/welcome/welcome-router");
const authRouter = require("./api/auth/auth-router");
const usersRouter = require("./api/users/users-router");
const rolesRouter = require("./api/roles/roles-router");
const messagesRouter = require("./api/messages/messages-router");
const convUsersRouter = require("./api/conv_users/conv-users-router");
const convRouter = require("./api/conv/conv-router");

const server = express();

// CORS Configuration - Updated to handle both development and production
const allowedOrigins = [
    "https://message-chat-app.netlify.app",
    "http://localhost:3000",
];

server.use(
    cors({
        origin: function (origin, callback) {
            // Allow requests with no origin (like mobile apps or curl requests)
            if (!origin) {
                return callback(null, true);
            }

            if (allowedOrigins.indexOf(origin) === -1) {
                const msg =
                    "The CORS policy for this site does not allow access from the specified Origin.";
                return callback(new Error(msg), false);
            }
            return callback(null, true);
        },
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
        exposedHeaders: ["Content-Length", "X-Foo", "X-Bar"],
    })
);

server.use(
    session({
        secret: "your_secret_key",
        resave: false,
        saveUninitialized: true,
    })
);

server.use(express.json()); // Parse JSON
server.use(passport.initialize()); // Init Passport
server.use(passport.session());

//Define the routes
server.use("/", welcomeRouter);
server.use("/auth", authRouter);
server.use("/users", usersRouter);
server.use("/roles", rolesRouter);
server.use("/messages", messagesRouter);
server.use("/conv-users", convUsersRouter);
server.use("/conv", convRouter);

module.exports = server;
