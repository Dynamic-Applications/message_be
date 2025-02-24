exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex("messages")
        .del()
        .then(function () {
            // Inserts seed entries
            return knex("messages").insert([
                {
                    id: 1,
                    user_id: 1,
                    conv_id: 1,
                    content: "Hello, how are you?",
                    sent_at: knex.fn.now(),
                },
                {
                    id: 2,
                    user_id: 2,
                    conv_id: 1,
                    content: "I am doing well, thanks!",
                    sent_at: knex.fn.now(),
                },
            ]);
        });
};
