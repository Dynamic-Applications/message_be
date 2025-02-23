exports.up = function (knex) {
    return knex.schema.createTable("users", function (table) {
        table.increments("id").primary(); // Auto-incrementing id
        table.string("username").notNullable();
        table.string("email").notNullable().unique();
        table.string("password").notNullable();
        table.string("reset_password_token");
        table.timestamp("reset_password_token_expires");
        table.timestamp("created_at").defaultTo(knex.fn.now()); // Default to current timestamp
        table
            .integer("role_id")
            .unsigned()
            .references("id")
            .inTable("roles")
            .onDelete("SET NULL");
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists("users");
};
