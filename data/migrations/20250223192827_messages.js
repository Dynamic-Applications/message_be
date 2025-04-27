exports.up = function (knex) {
    return knex.schema.createTable("messages", (table) => {
        table.increments("id");
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
        table.text("text").notNullable();
        table.timestamp("created_at").defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists("messages");
};
