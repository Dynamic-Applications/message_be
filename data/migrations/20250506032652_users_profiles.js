
exports.up = function (knex) {
    return knex.schema.createTable("users_profiles", function (table) {
        table.increments("id").primary(); // Auto-incrementing id
        table
            .integer("user_id")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("users")
            .onDelete("CASCADE");
        table.string("avatar").nullable();
        table.string("status").defaultTo("Available");
        table.string("phone").nullable();
        table.specificType("interests", "TEXT[]").nullable();
        table.string("bio").nullable();
        table.string("location").nullable();
        table.timestamp("created_at").defaultTo(knex.fn.now());
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("users_profiles");
};
