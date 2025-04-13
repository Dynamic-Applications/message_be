exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex("users").del();

    // Inserts seed entries
    await knex("users").insert([
        {
            id: 1,
            username: "alice",
            email: "alice@example.com",
            password: "password123", // Add a placeholder password here
        },
        {
            id: 2,
            username: "bob",
            email: "bob@example.com",
            password: "password123", // Same placeholder for Bob
        },
    ]);
};
