const express = require('express');
const cors = require('cors');

// Require the routes


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



module.exports = server;