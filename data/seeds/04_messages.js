exports.seed = async function (knex) {
    // Clear the messages table before seeding
    await knex("messages").del();

    try {
        await knex("messages").insert([
            {
                user_id: 1,
                conv_id: 1,
                text: "Hello, how are you?",
            },
            {
                user_id: 2,
                conv_id: 1,
                text: "I am doing well, thanks!",
            },
            {
                user_id: 1,
                conv_id: 1,
                text: "That's good to hear. What have you been up to?",
            },
            {
                user_id: 2,
                conv_id: 1,
                text: "Just working on a few things. How about you?",
            },
            {
                user_id: 3,
                conv_id: 2,
                text: "Hey, are we still meeting up this weekend?",
            },
            {
                user_id: 4,
                conv_id: 2,
                text: "Yes! I’m looking forward to it.",
            },
            {
                user_id: 3,
                conv_id: 2,
                text: "Great! I’ll confirm the time soon.",
            },
            {
                user_id: 1,
                conv_id: 3,
                text: "Hi, I wanted to ask you something.",
            },
            {
                user_id: 5,
                conv_id: 3,
                text: "Sure, what’s up?",
            },
            {
                user_id: 1,
                conv_id: 3,
                text: "Do you know where I can find the latest project report?",
            },
            {
                user_id: 5,
                conv_id: 3,
                text: "It should be in the shared folder. I can send you the link.",
            },
            {
                user_id: 2,
                conv_id: 4,
                text: "Did you watch the new episode of the show last night?",
            },
            {
                user_id: 6,
                conv_id: 4,
                text: "Yes, it was amazing! Can't wait for the next one.",
            },
            {
                user_id: 2,
                conv_id: 4,
                text: "Same here! The plot twist at the end was wild.",
            },
            {
                user_id: 6,
                conv_id: 4,
                text: "I know right? Totally unexpected!",
            },
        ]);
        console.log("✅ Messages seeded successfully");
    } catch (err) {
        console.error("❌ Failed to seed messages:", err.message);
    }
};
