exports.up = function (knex) {
    return knex.schema.createTable("users", (table) => {
        table.increments("id");
        table.string("username", 128).notNullable().unique();
        table.string("email", 128).notNullable().unique();
        table.string("password", 128);
        table.string("reset_password_token");
        table.timestamp("reset_password_token_expires");
        // Change avatar to bytea type for binary storage
        table.binary("avatar");
        table.string("avatar_type", 50); // To store the mime type (e.g., 'image/jpeg')
        table.string("status", 100).defaultTo("Available");
        table.string("phone", 20);
        table.text("location");
        table.text("bio");
        table.specificType("interests", "TEXT[]");
        table.timestamp("joined_date").defaultTo(knex.fn.now());
        table.timestamps(true, true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists("users");
};
