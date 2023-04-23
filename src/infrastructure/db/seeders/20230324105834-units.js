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
    await queryInterface.bulkInsert("units", [
      {
        id: 1,
        name: "cup",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: "tablespoon",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        name: "teaspoon",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        name: "ounce",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        name: "pound",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 6,
        name: "gallon",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 7,
        name: "quart",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 8,
        name: "pint",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 9,
        name: "liter",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 10,
        name: "milliliter",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 11,
        name: "dash",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 12,
        name: "pinch",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 13,
        name: "piece",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 14,
        name: "can",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 15,
        name: "package",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 16,
        name: "bottle",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 17,
        name: "jar",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 18,
        name: "box",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 19,
        name: "bag",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 20,
        name: "slice",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 21,
        name: "stick",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 22,
        name: "head",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 23,
        name: "bunch",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 24,
        name: "clove",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 25,
        name: "sprig",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 26,
        name: "handful",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 27,
        name: "gram",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 28,
        name: "kilogram",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 29,
        name: "milligram",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 30,
        name: "fluid ounce",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 31,
        name: "item",
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
    await queryInterface.bulkDelete("units", null, {});
  },
};
