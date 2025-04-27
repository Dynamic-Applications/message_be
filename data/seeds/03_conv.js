exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex("conv").del();

    // Inserts seed entries
    await knex("conv").insert([
        { id: 1, title: "General Conversation" },
        { id: 2, title: "Project Discussion" },
        { id: 3, title: "Project Reports" },
        { id: 4, title: "TV Show Discussion" },
    ]);
};
