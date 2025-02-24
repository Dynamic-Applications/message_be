exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex("conv_users")
        .del()
        .then(function () {
            // Inserts seed entries
            return knex("conv_users").insert([
                { conv_id: 1, user_id: 1 },
                { conv_id: 1, user_id: 2 },
            ]);
        });
};
