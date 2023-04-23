"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    const attribute = {
      recipe_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "recipes",
          key: "id",
        },
      },

      ingredient_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "ingredients",
          key: "id",
        },
      },

      unit_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "units",
          key: "id",
        },
      },

      quantity: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
    };
    await queryInterface.createTable("recipe_ingredient", attribute);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("recipe_ingredient");
  },
};
