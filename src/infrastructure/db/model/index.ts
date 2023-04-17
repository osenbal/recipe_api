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
import UnitModel from "./recipe/unit.model";
import FavoriteModel from "./recipe/favorite.model";

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

User.belongsTo(Role, {
  foreignKey: "role_id",
});

Role.hasMany(User, {
  foreignKey: "role_id",
});

Role.belongsToMany(Permission, {
  through: RolePermission,
  foreignKey: "role_id",
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
});
