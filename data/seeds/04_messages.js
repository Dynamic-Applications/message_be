exports.seed = async function (knex) {
    await knex("messages").del();

    await knex("messages").insert([
        {
            id: 1,
            user_id: 1,
            conv_id: 1,
            content: "Hey Bob, how are you?",
            sent_at: knex.fn.now(),
        },
        {
            id: 2,
            user_id: 2,
            conv_id: 1,
            content: "Doing great, Alice! You?",
            sent_at: knex.fn.now(),
        },
    ]);
};
