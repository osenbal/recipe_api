"use strict";
// import { PERMISSIONS } from "./PERMISSIONS";
// const PERMISSIONS = require("../../../utils/PERMISSIONS");
const PERMISSIONS = {
  LIST_RECIPE: 1,
  READ_RECIPE: 2,
  CREATE_RECIPE: 3,
  UPDATE_RECIPE: 4,
  DELETE_RECIPE: 5,
};

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

    // Create permissions
    return queryInterface.bulkInsert("permissions", [
      {
        title: "list_recipe",
        description: "Permission for read list recipe",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "read_recipe",
        description: "Permission for read detail recipe",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "create_recipe",
        description: "Permission for create recipe",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "update_recipe",
        description: "Permission for update recipe",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "delete_recipe",
        description: "Permission for delete recipe",
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
    return queryInterface.bulkDelete("permissions", null, {});
  },
};
