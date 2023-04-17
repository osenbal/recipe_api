import User from "@domain/entities/auth/user";

export interface LoginUserUseCase {
  execute(user: User): Promise<any>;
}
