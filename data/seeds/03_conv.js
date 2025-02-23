exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex("conv")
        .del()
        .then(function () {
            // Inserts seed entries
            return knex("conv").insert([
                { id: 1, created_at: knex.fn.now() },
                { id: 2, created_at: knex.fn.now() },
            ]);
        });
};
