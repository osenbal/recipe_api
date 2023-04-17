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
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },

      recipe_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "recipes",
          key: "id",
        },
      },

      calories: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true,
      },

      calories_unit_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true,
        references: {
          model: "units",
          key: "id",
        },
      },

      fat: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true,
      },

      fat_unit_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true,
        references: {
          model: "units",
          key: "id",
        },
      },

      carbs: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true,
      },

      carbs_unit_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true,
        references: {
          model: "units",
          key: "id",
        },
      },

      protein: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true,
      },

      protein_unit_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true,
        references: {
          model: "units",
          key: "id",
        },
      },

      sugar: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true,
      },

      sugar_unit_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true,
        references: {
          model: "units",
          key: "id",
        },
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    };
    await queryInterface.createTable("nutritions", attribute);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("nutritions");
  },
};
