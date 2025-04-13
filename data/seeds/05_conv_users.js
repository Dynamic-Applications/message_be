exports.seed = async function (knex) {
    // Clear the join table
    await knex("conv_users").del();

    // Seed associations (not users!)
    await knex("conv_users").insert([
        { user_id: 1, conv_id: 1 },
        { user_id: 2, conv_id: 1 },
        { user_id: 1, conv_id: 2 },
    ]);
};
