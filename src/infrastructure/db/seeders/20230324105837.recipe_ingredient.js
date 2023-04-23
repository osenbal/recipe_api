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
    await queryInterface.bulkInsert("recipe_ingredient", [
      {
        recipe_id: 1,
        ingredient_id: 1,
        unit_id: 20,
        quantity: 1,
      },
      {
        recipe_id: 1,
        ingredient_id: 6,
        unit_id: 27,
        quantity: 5,
      },
      {
        recipe_id: 1,
        ingredient_id: 11,
        unit_id: 31,
        quantity: 3,
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
    await queryInterface.bulkDelete("recipe_ingredient", null, {});
  },
};
