exports.up = function (knex) {
    return knex.schema.createTable("roles", function (table) {
        table.increments("id").primary(); // Auto-incrementing id
        table.string("rolename").notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists("roles");
};
