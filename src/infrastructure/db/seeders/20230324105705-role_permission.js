"use strict";
// import { PERMISSIONS } from "./PERMISSIONS";
// const PERMISSIONS = require("../../../utils/PERMISSIONS");

const ROLE = {
  ADMIN: 1,
  CHEF: 2,
  COMMON_USER: 3,
};

const PERMISSIONS = {
  LIST_RECIPE: 1,
  READ_RECIPE: 2,
  CREATE_RECIPE: 3,
  UPDATE_RECIPE: 4,
  DELETE_RECIPE: 5,
};

// console.log("PERMISSIONS.LIST_RECIPE: ", PERMISSIONS);

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
    return queryInterface.bulkInsert("role_permission", [
      {
        role_id: ROLE.ADMIN,
        permission_id: PERMISSIONS.LIST_RECIPE,
      },
      {
        role_id: ROLE.ADMIN,
        permission_id: PERMISSIONS.READ_RECIPE,
      },
      {
        role_id: ROLE.ADMIN,
        permission_id: PERMISSIONS.CREATE_RECIPE,
      },
      {
        role_id: ROLE.ADMIN,
        permission_id: PERMISSIONS.UPDATE_RECIPE,
      },
      {
        role_id: ROLE.ADMIN,
        permission_id: PERMISSIONS.DELETE_RECIPE,
      },
      {
        role_id: ROLE.CHEF,
        permission_id: PERMISSIONS.LIST_RECIPE,
      },
      {
        role_id: ROLE.CHEF,
        permission_id: PERMISSIONS.READ_RECIPE,
      },
      {
        role_id: ROLE.CHEF,
        permission_id: PERMISSIONS.CREATE_RECIPE,
      },
      {
        role_id: ROLE.CHEF,
        permission_id: PERMISSIONS.UPDATE_RECIPE,
      },
      {
        role_id: ROLE.CHEF,
        permission_id: PERMISSIONS.DELETE_RECIPE,
      },
      {
        role_id: ROLE.COMMON_USER,
        permission_id: PERMISSIONS.LIST_RECIPE,
      },
      {
        role_id: ROLE.COMMON_USER,
        permission_id: PERMISSIONS.READ_RECIPE,
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
    return queryInterface.bulkDelete("role_permission", null, {});
  },
};
