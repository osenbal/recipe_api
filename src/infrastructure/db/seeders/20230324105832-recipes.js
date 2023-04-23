"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("recipes", [
      {
        id: 1,
        chef_id: 1,
        category_id: 1,
        dish_id: 2,
        title: "Chicken Tikka Masala",
        description:
          "Chicken Tikka Masala is a dish of roasted marinated chicken chunks in a spiced curry sauce. It is a popular dish in Great Britain, the United States, Canada, Australia, New Zealand, and many other countries.",
        thumbnail_url: "https://www.youtube.com/watch?v=1QX4Z3Y6YqA",
        video_url: "https://www.youtube.com/watch?v=1QX4Z3Y6YqA",
        cookingTime: 30, // in minutes
        prepTime: 10, // in minutes
        serving: 4, // in people
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("recipes", null, {});
  },
};
