exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex("users_profiles").del();

    // Inserts seed entries
    await knex("users_profiles").insert([
        {
            user_id: 1,
            avatar: "https://example.com/avatar1.jpg",
            status: "Busy",
            phone: "123-456-7890",
            interests: ["coding", "music", "hiking"],
            bio: "Full-stack developer and outdoor enthusiast.",
            location: "San Francisco, CA",
        },
        {
            user_id: 2,
            avatar: "https://example.com/avatar2.jpg",
            status: "Available",
            phone: "987-654-3210",
            interests: ["gaming", "reading"],
            bio: "Backend developer who loves sci-fi novels.",
            location: "New York, NY",
        },
        {
            user_id: 3,
            avatar: null,
            status: "Offline",
            phone: null,
            interests: null,
            bio: null,
            location: null,
        },
    ]);
};
