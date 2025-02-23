exports.up = function (knex) {
    return knex.schema.createTable("conv_users", function (table) {
        table.increments("id").primary(); // Auto-incrementing id
        table
            .integer("conv_id")
            .unsigned()
            .references("id")
            .inTable("conv")
            .onDelete("CASCADE");
        table
            .integer("user_id")
            .unsigned()
            .references("id")
            .inTable("users")
            .onDelete("CASCADE");
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists("conv_users");
};
