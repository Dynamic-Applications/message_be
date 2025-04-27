exports.seed = async function (knex) {
    // First, ensure the users table is empty
    await knex("users").del();

    // Insert seed data
    await knex("users").insert([
        {
            username: "john_doe",
            email: "john@example.com",
            password: "hashed_password_here", // In reality, this should be properly hashed
            avatar: "https://example.com/avatars/john.jpg",
            status: "Available",
            phone: "+1234567890",
            location: "New York, USA",
            bio: "Software developer passionate about creating amazing applications",
            interests: ["coding", "reading", "hiking"],
            joined_date: new Date(),
        },
        {
            username: "jane_smith",
            email: "jane@example.com",
            password: "hashed_password_here", // In reality, this should be properly hashed
            avatar: "https://example.com/avatars/jane.jpg",
            status: "Busy",
            phone: "+1987654321",
            location: "San Francisco, USA",
            bio: "UX Designer with a love for creating beautiful interfaces",
            interests: ["design", "art", "photography"],
            joined_date: new Date(),
        },
    ]);
};
