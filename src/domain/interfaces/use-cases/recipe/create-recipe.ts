import { ICreateRecipeRequestBody } from "@domain/interfaces/http/request-body/recipe";
export interface CreateRecipeUseCase {
  execute(data: ICreateRecipeRequestBody): Promise<boolean>;
}
