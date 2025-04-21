const express = require('express');
const cors = require('cors');
const passport = require("passport");
const session = require("express-session");
require("dotenv").config();
require("./api/auth/passport");




// Require the routes
const welcomeRouter = require('./api/welcome/welcome-router');
const authRouter = require('./api/auth/auth-router');
const usersRouter = require('./api/users/users-router');
const rolesRouter = require("./api/roles/roles-router");
const messagesRouter = require("./api/messages/messages-router");
const convUsersRouter = require("./api/conv_users/conv-users-router");
const convRouter = require("./api/conv/conv-router");

const server = express();

// CORS Configuration
const allowedOrigins = [
    "https://message-chat-app.netlify.app",
    "http://localhost:3000",
];

server.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
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
server.use('/', welcomeRouter);
server.use('/auth', authRouter);
server.use('/users', usersRouter);
server.use("/roles", rolesRouter);
server.use("/messages", messagesRouter);
server.use("/conv-users", convUsersRouter);
server.use("/conv", convRouter);


module.exports = server;














