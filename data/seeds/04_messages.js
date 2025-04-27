exports.seed = async function (knex) {
    await knex("messages").del();

    await knex("messages").insert([
        {
            text: "Hello, how are you?",
            user_id: 1,
            conv_id: 1,
        },
        {
            text: "I am doing well, thanks!",
            user_id: 2,
            conv_id: 1,
        },
    ]);
};
