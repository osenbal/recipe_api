import Recipe from "@domain/entities/recipe/recipe";
import { RecipeModel } from "@infrastructure/db/model/recipe/recipe.model";
import { IngredientModel } from "@infrastructure/db/model/recipe/ingredient.model";
import { RecipeIngredientModel } from "@infrastructure/db/model/recipe/recipe_ingredient.model";
import instructionModel, {
  InstructionModel,
} from "@infrastructure/db/model/recipe/instruction.model";
import { UnitModel } from "@infrastructure/db/model/recipe/unit.model";
import { RecipeDataSource } from "@data/interfaces/data-sources/recipe/recipe-data-source";
import SQLDatabaseWrapper from "@data/interfaces/data-sources/SQL-database-wrapper";
import { Transaction, Op } from "sequelize";

export default class MySQLRecipeDataSource implements RecipeDataSource {
  private db: SQLDatabaseWrapper;
  private excludeTimestamps = ["createdAt", "updatedAt", "deletedAt"];

  constructor(db: SQLDatabaseWrapper) {
    this.db = db;
  }

  async addRecipe(recipe: Recipe, t: Transaction): Promise<RecipeModel | null> {
    const result = await this.db.create(recipe, t);
    return result;
  }

  async updateRecipeById(
    recipe_id: number,
    recipe: Recipe,
    t?: Transaction
  ): Promise<RecipeModel | null> {
    if (!this.db.updateById) return null;
    const result = await this.db.updateById(recipe_id, recipe, t);
    return result;
  }

  async deleteRecipeById(id: number, t?: Transaction): Promise<boolean> {
    if (!this.db.updateById) return false;
    const result = await this.db.updateById(
      id,
      {
        deletedAt: new Date(),
      },
      t
    );

    return result[0] == 1 ? true : false;
  }

  async hardDeleteRecipeById(id: number, t?: Transaction): Promise<boolean> {
    if (!this.db.destroyById) return false;
    const result = await this.db.destroyById(id, t);
    return result !== null;
  }

  async getRecipeById(id: number): Promise<RecipeModel | null> {
    const result = await this.db.findOne({
      where: { id },
      include: [
        {
          model: IngredientModel,
          as: "recipe_ingredient",
          attributes: {
            exclude: this.excludeTimestamps,
          },
          through: {
            model: RecipeIngredientModel,
            attributes: [],
          },
          include: {
            model: RecipeIngredientModel,
            as: "quantity_detail",
            attributes: ["quantity"],
            include: {
              model: UnitModel,
              as: "unit_measurment",
              attributes: {
                exclude: this.excludeTimestamps,
              },
            },
          },
        },
        {
          model: InstructionModel,
          as: "recipe_instruction",
          attributes: {
            exclude: this.excludeTimestamps,
          },
        },
      ],
      order: [
        [{ model: InstructionModel, as: "recipe_instruction" }, "order", "ASC"],
      ],
    });
    return result;
  }

  async getRecipes(): Promise<RecipeModel[] | null> {
    const result = await this.db.findAll({
      where: { deletedAt: null },
      include: ["category", "dish", "chef"],
    });
    return result;
  }

  async getRecipeFilter(
    search?: string,
    category_id?: number,
    dish_id?: number,
    chef_id?: number
  ): Promise<RecipeModel[] | null> {
    const q = {};
    if (search) Object.assign(q, { title: { [Op.like]: `%${search}%` } });
    if (category_id) Object.assign(q, { category_id });
    if (dish_id) Object.assign(q, { dish_id });
    if (chef_id) Object.assign(q, { chef_id });

    const result = await this.db.findAll({
      where: {
        [Op.and]: [q, { deletedAt: null }],
      },
      include: ["category", "dish", "chef"],
    });
    return result;
  }

  async getRecipesByCategoryId(
    category_id: number
  ): Promise<RecipeModel[] | null> {
    const result = await this.db.findAll({ where: { category_id } });
    return result;
  }

  async getRecipesByDishId(dish_id: number): Promise<RecipeModel[] | null> {
    const result = await this.db.findAll({ where: { dish_id } });
    return result;
  }

  async getRecipesByChefId(chef_id: number): Promise<RecipeModel[] | null> {
    const result = await this.db.findAll({ where: { chef_id } });
    return result;
  }
}
