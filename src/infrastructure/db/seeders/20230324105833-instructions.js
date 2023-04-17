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
    await queryInterface.bulkInsert("instructions", [
      {
        id: 1,
        recipe_id: 1,
        description: "Preheat oven to 350 degrees F (175 degrees C).",
        order: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        recipe_id: 1,
        description:
          "Place the chicken, onion, and celery in a 9x13-inch baking dish.",
        order: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        recipe_id: 1,
        description:
          "Season with salt and pepper, to taste, and pour the chicken broth over the top.",
        order: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        recipe_id: 1,
        description:
          "Bake in the preheated oven until the chicken is no longer pink in the center and the juices run clear, about 1 hour. An instant-read thermometer inserted into the center should read at least 165 degrees F (74 degrees C).",
        order: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        recipe_id: 1,
        description:
          "An instant-read thermometer inserted into the center should read at least 165 degrees F (74 degrees C).",

        order: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 6,
        recipe_id: 1,
        description:
          "An instant-read thermometer inserted into the center should read at least 165 degrees F (74 degrees C).",

        order: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 7,
        recipe_id: 1,
        description:
          "An instant-read thermometer inserted into the center should read at least 165 degrees F (74 degrees C).",

        order: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 8,
        recipe_id: 1,
        description:
          "An instant-read thermometer inserted into the center should read at least 165 degrees F (74 degrees C).",

        order: 8,
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
    await queryInterface.bulkDelete("instructions", null, {});
  },
};
