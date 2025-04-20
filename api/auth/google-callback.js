// netlify/functions/google-callback.js
const { buildToken } = require("./auth-router"); // Adjust the path if necessary
require("dotenv").config(); // Load env variables

exports.handler = async function (event, context) {
    try {
        const token = buildToken(event.body); // Adjust if needed
        return {
            statusCode: 302,
            headers: {
                Location: `${process.env.UI_URL_PROD}/auth/google/callback?token=${token}`,
            },
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Failed to generate token" }),
        };
    }
};
