exports.up = function (knex) {
    return knex.schema.createTable("messages", function (table) {
        table.increments("id").primary(); // Auto-incrementing id
        table
            .integer("user_id")
            .unsigned()
            .references("id")
            .inTable("users")
            .onDelete("CASCADE");
        table
            .integer("conv_id")
            .unsigned()
            .references("id")
            .inTable("conv")
            .onDelete("CASCADE");
        table.text("content").notNullable();
        table.timestamp("sent_at").defaultTo(knex.fn.now()); // Default to current timestamp
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists("messages");
};
