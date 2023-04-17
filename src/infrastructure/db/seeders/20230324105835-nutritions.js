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
    await queryInterface.bulkInsert("nutritions", [
      {
        id: 1,
        recipe_id: 1,

        calories: 100,
        calories_unit_id: 27,

        fat: 10,
        fat_unit_id: 27,

        carbs: 10,
        carbs_unit_id: 27,

        protein: 10,
        protein_unit_id: 27,

        sugar: 10,
        sugar_unit_id: 27,

        createdAt: new Date(),
        updatedAt: new Date(),
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
    await queryInterface.bulkDelete("nutritions", null, {});
  },
};
