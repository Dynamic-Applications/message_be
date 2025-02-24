const express = require('express');
const cors = require('cors');

// Require the routes
const welcomeRouter = require('./api/welcome/welcome-router');
const authRouter = require('./api/auth/auth-router');
const usersRouter = require('./api/users/users-router');
const rolesRouter = require("./api/roles/roles-router");
const messagesRouter = require("./api/messages/messages-router");
const convUsersRouter = require("./api/conv_users/conv-users-router");
const convRouter = require("./api/conv/conv-router");

const server = express();

// Configure CORS
const allowedOrigins = [
    "http://localhost:3000", // Development frontend
    process.env.UI_URL_PROD, // Production frontend
];
server.use(
    cors({
        origin: allowedOrigins,
        credentials: true, // Allow cookies or auth headers
    })
);

// Parse JSON body
server.use(express.json());

//Define the routes
server.use('/', welcomeRouter);
server.use('/auth', authRouter);
server.use('/users', usersRouter);
server.use("/roles", rolesRouter);
server.use("/messages", messagesRouter);
server.use("/conv-users", convUsersRouter);
server.use("/conv", convRouter);


module.exports = server;