const cron = require("node-cron");
const db = require("../config/db");

// Runs every day at midnight
cron.schedule("0 0 * * *", async () => {
    try {
        await db.query(`
            DELETE FROM messages
            WHERE created_at < NOW() - INTERVAL '7 days';
        `);
        console.log("Old messages deleted successfully.");
    } catch (err) {
        console.error("Failed to delete old messages:", err.message);
    }
});
