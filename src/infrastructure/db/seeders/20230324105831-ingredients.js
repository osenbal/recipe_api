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
    await queryInterface.bulkInsert("ingredients", [
      {
        id: 1,
        name: "chicken",
        img_url: "https://www.themealdb.com/images/ingredients/Chicken.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: "beef",
        img_url: "https://www.themealdb.com/images/ingredients/Beef.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        name: "pork",
        img_url: "https://www.themealdb.com/images/ingredients/Pork.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        name: "fish",
        img_url: "https://www.themealdb.com/images/ingredients/Fish.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        name: "tomato",
        img_url: "https://www.themealdb.com/images/ingredients/Tomato.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 6,
        name: "onion",
        img_url: "https://www.themealdb.com/images/ingredients/Onion.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 7,
        name: "potato",
        img_url: "https://www.themealdb.com/images/ingredients/Potato.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 8,
        name: "carrot",
        img_url: "https://www.themealdb.com/images/ingredients/Carrot.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 9,
        name: "broccoli",
        img_url: "https://www.themealdb.com/images/ingredients/Broccoli.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 10,
        name: "mushroom",
        img_url: "https://www.themealdb.com/images/ingredients/Mushroom.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 11,
        name: "egg",
        img_url: "https://www.themealdb.com/images/ingredients/Egg.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 12,
        name: "cheese",
        img_url: "https://www.themealdb.com/images/ingredients/Cheese.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 13,
        name: "rice",
        img_url: "https://www.themealdb.com/images/ingredients/Rice.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 14,
        name: "bread",
        img_url: "https://www.themealdb.com/images/ingredients/Bread.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 15,
        name: "pasta",
        img_url: "https://www.themealdb.com/images/ingredients/Pasta.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 16,
        name: "chocolate",
        img_url: "https://www.themealdb.com/images/ingredients/Chocolate.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 17,
        name: "strawberry",
        img_url: "https://www.themealdb.com/images/ingredients/Strawberry.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 18,
        name: "banana",
        img_url: "https://www.themealdb.com/images/ingredients/Banana.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 19,
        name: "apple",
        img_url: "https://www.themealdb.com/images/ingredients/Apple.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 20,
        name: "lemon",
        img_url: "https://www.themealdb.com/images/ingredients/Lemon.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 21,
        name: "orange",
        img_url: "https://www.themealdb.com/images/ingredients/Orange.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 22,
        name: "milk",

        img_url: "https://www.themealdb.com/images/ingredients/Milk.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 23,
        name: "butter",

        img_url: "https://www.themealdb.com/images/ingredients/Butter.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 24,
        name: "salt",
        img_url: "https://www.themealdb.com/images/ingredients/Salt.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        id: 25,

        name: "pepper",
        img_url: "https://www.themealdb.com/images/ingredients/Pepper.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 26,
        name: "sugar",
        img_url: "https://www.themealdb.com/images/ingredients/Sugar.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 27,
        name: "flour",
        img_url: "https://www.themealdb.com/images/ingredients/Flour.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 28,
        name: "garlic",
        img_url: "https://www.themealdb.com/images/ingredients/Garlic.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 29,
        name: "leek",
        img_url: "https://www.themealdb.com/images/ingredients/Leek.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 30,
        name: "cucumber",
        img_url: "https://www.themealdb.com/images/ingredients/Cucumber.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 31,
        name: "flour",
        img_url: "https://www.themealdb.com/images/ingredients/Flour.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 32,
        name: "turmeric",
        img_url: "https://www.themealdb.com/images/ingredients/Turmeric.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 33,
        name: "corn",
        img_url: "https://www.themealdb.com/images/ingredients/Corn.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 34,
        name: "wheat",
        img_url: "https://www.themealdb.com/images/ingredients/Wheat.png",
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
    await queryInterface.bulkDelete("ingredients", null, {});
  },
};
