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
    await queryInterface.bulkInsert("users", [
      {
        id: 1,
        email: "common_user@gmail.com",
        password:
          "$2b$10$CCcC1IJfN2woCQnoxClJBu/dkQs4sZLVfRl10w0CEFL5QSTIDwDCW",
        role_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: 2,
        email: "chef1@gmail.com",
        password:
          "$2b$10$CCcC1IJfN2woCQnoxClJBu/dkQs4sZLVfRl10w0CEFL5QSTIDwDCW",
        role_id: 2,
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
    return queryInterface.bulkDelete("users", null, {});
  },
};
