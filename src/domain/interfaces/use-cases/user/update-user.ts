import { User } from "@domain/entities/auth/user";
import { CommonUser } from "@domain/entities/user/commonUser";
import { Chef } from "@domain/entities/user/chef";

export interface UpdateUserUseCase {
  executeUpdateUser(data: User, context: { id: number }): Promise<User | null>;
  executeUpdateCommonUser(
    data: CommonUser,
    context: { user_id: number }
  ): Promise<CommonUser | null>;
  executeUpdateChef(
    data: Chef,
    context: { user_id: number }
  ): Promise<Chef | null>;
}
