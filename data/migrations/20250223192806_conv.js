exports.up = function (knex) {
    return knex.schema.createTable("conv", function (table) {
        table.increments("id").primary(); // Auto-incrementing id
        table.timestamp("created_at").defaultTo(knex.fn.now()); // Default to current timestamp
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists("conv");
};
