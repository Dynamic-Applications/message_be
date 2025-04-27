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
        {
            id: 3,
            username: "charlie",
            email: "charlie@example.com",
            password: "password123", // Same placeholder for Charlie
        },
        {
            id: 4,
            username: "dave",
            email: "dave@example.com",
            password: "password123", // Same placeholder for Dave
        },
        {
            id: 5,
            username: "eve",
            email: "eve@example.com",
            password: "password123", // Same placeholder for Eve
        },
        {
            id: 6,
            username: "frank",
            email: "frank@example.com",
            password: "password123", // Same placeholder for Frank
        },  
    ]);
};
