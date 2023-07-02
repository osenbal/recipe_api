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
    await queryInterface.bulkInsert("dishs", [
      {
        id: 1,
        name: "beef dish",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: "vegetable dish",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        name: "fish dish",
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
    await queryInterface.bulkDelete("dishs", null, {});
  },
};
