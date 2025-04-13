exports.up = function (knex) {
    return knex.schema.createTable("messages", function (table) {
        table.increments("id").primary(); // Auto-incrementing primary key

        table
            .integer("user_id")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("users")
            .onDelete("CASCADE");

        table
            .integer("conv_id")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("conv")
            .onDelete("CASCADE");

        table.text("content").notNullable();

        table.timestamp("sent_at").notNullable().defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists("messages");
};
