exports.up = function (knex) {
    return knex.schema.createTable("conv", function (table) {
        table.increments("id").primary();
        table.string("title").notNullable(); // Ensure this column is present
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists("conv");
};
