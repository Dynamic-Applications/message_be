exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex("users")
        .del()
        .then(function () {
            // Inserts seed entries
            return knex("users").insert([
                {
                    id: 1,
                    username: "admin_user",
                    email: "admin@example.com",
                    password: "hashed_password_1",
                    role_id: 1,
                },
                {
                    id: 2,
                    username: "regular_user",
                    email: "user@example.com",
                    password: "hashed_password_2",
                    role_id: 2,
                },
            ]);
        });
};
