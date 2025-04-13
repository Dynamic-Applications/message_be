exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex("conv").del();

    // Inserts seed entries
    await knex("conv").insert([
        { id: 1, title: "General Conversation" }, // Example data
        { id: 2, title: "Project Discussion" },
    ]);
};
