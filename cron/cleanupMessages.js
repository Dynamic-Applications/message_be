const cron = require("node-cron");
const db = require("../config/db");

cron.schedule("0 0 * * *", async () => {
    try {
        const result = await db.query(`
            DELETE FROM messages
            WHERE created_at < NOW() - INTERVAL '7 days';
        `);
        console.log(
            `Old messages deleted successfully. Rows affected: ${
                result.rowCount || result.affectedRows
            }`
        );
    } catch (err) {
        console.error("Failed to delete old messages:", err.message);
    }
});
