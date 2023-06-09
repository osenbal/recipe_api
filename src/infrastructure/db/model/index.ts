import { DataTypes } from "sequelize";
import { sequelize } from "../sequelize";
import RoleSequelize from "./role.model";
import UserSequelize from "./users.model";
import PermissionSequelize from "./permission.model";
import RolePermissionSequelize from "./role_permission.model";
import CommonUserModel from "./commonUser.model";
import ChefModel from "./chef.model";

import RecipeModel from "./recipe/recipe.model";
import CategoryModel from "./recipe/category.model";
import DishModel from "./recipe/dish.model";
import InstructionModel from "./recipe/instruction.model";
import IngredientModel from "./recipe/ingredient.model";
import RecipeIngredientModel from "./recipe/recipe_ingredient.model";
import UnitModel from "./recipe/unit.model";
import FavoriteModel from "./favorite/favorite.model";
import NutritionModel from "./recipe/nutrition.model";

export const Role = RoleSequelize(sequelize, DataTypes);
export const User = UserSequelize(sequelize, DataTypes);
export const Permission = PermissionSequelize(sequelize, DataTypes);
export const RolePermission = RolePermissionSequelize(sequelize, DataTypes);
export const CommonUser = CommonUserModel(sequelize, DataTypes);
export const Chef = ChefModel(sequelize, DataTypes);

export const Recipe = RecipeModel(sequelize, DataTypes);
export const Category = CategoryModel(sequelize, DataTypes);
export const Dish = DishModel(sequelize, DataTypes);
export const Instruction = InstructionModel(sequelize, DataTypes);
export const Ingredient = IngredientModel(sequelize, DataTypes);
export const Unit = UnitModel(sequelize, DataTypes);
export const Favorite = FavoriteModel(sequelize, DataTypes);
export const RecipeIngredient = RecipeIngredientModel(sequelize, DataTypes);

export const Nutrition = NutritionModel(sequelize, DataTypes);

// auth
User.belongsTo(Role, {
  foreignKey: "role_id",
  as: "role",
});

Role.hasMany(User, {
  foreignKey: "role_id",
});

Role.belongsToMany(Permission, {
  through: RolePermission,
  foreignKey: "role_id",
  as: "permissions",
});

Permission.belongsToMany(Role, {
  through: RolePermission,
  foreignKey: "permission_id",
});

CommonUser.belongsTo(User, {
  foreignKey: "user_id",
});

Chef.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

// recipe
Recipe.belongsTo(Chef, {
  foreignKey: "chef_id",
  as: "chef",
});

Chef.hasMany(Recipe, {
  foreignKey: "chef_id",
});

Recipe.belongsTo(Category, {
  foreignKey: "category_id",
  as: "category",
});

Category.hasMany(Recipe, {
  foreignKey: "category_id",
});

Recipe.belongsTo(Dish, {
  foreignKey: "dish_id",
  as: "dish",
});

Dish.hasMany(Recipe, {
  foreignKey: "dish_id",
});

// relation recipe with instruction
Recipe.hasMany(Instruction, {
  onDelete: "CASCADE",
  foreignKey: "recipe_id",
  as: "recipe_instruction",
});
Instruction.belongsTo(Recipe, {
  foreignKey: "recipe_id",
  as: "recipe_instruction",
});

Recipe.belongsToMany(Ingredient, {
  through: RecipeIngredient,
  foreignKey: "recipe_id",
  as: "recipe_ingredient",
  onDelete: "CASCADE",
});

Ingredient.belongsToMany(Recipe, {
  through: RecipeIngredient,
  foreignKey: "ingredient_id",
});

// Relasi One-to-Many antara Recipe dan RecipeIngredient
Recipe.hasMany(RecipeIngredient, {
  foreignKey: "recipe_id",
  onDelete: "CASCADE",
});
RecipeIngredient.belongsTo(Recipe, {
  foreignKey: "recipe_id",
});

// Relasi One-to-Many antara Ingredient dan RecipeIngredient
Ingredient.hasMany(RecipeIngredient, {
  foreignKey: "ingredient_id",
  as: "quantity_detail",
});
RecipeIngredient.belongsTo(Ingredient, {
  foreignKey: "ingredient_id",
  as: "quantity_detail",
});

// Relasi One-to-Many antara Unit dan RecipeIngredient
Unit.hasMany(RecipeIngredient, {
  foreignKey: "unit_id",
  as: "unit_measurment",
});
RecipeIngredient.belongsTo(Unit, {
  foreignKey: "unit_id",
  as: "unit_measurment",
});

// relation recipe with favorite
Recipe.hasMany(Favorite, {
  foreignKey: "recipe_id",
  as: "favorite",
});
Favorite.belongsTo(Recipe, {
  foreignKey: "recipe_id",
  as: "recipe",
});

// relation user with favorite
User.hasMany(Favorite, {
  foreignKey: "user_id",
});
Favorite.belongsTo(User, {
  foreignKey: "user_id",
});

// relation recipe with nutrition
Recipe.hasOne(Nutrition, {
  foreignKey: "recipe_id",
  as: "nutrition",
});

Nutrition.belongsTo(Recipe, {
  foreignKey: "recipe_id",
  as: "recipe",
});
