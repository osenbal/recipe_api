import IUser from "@domain/entities/auth/user";

export interface LoginUserUseCase {
  execute(user: IUser): Promise<any>;
}
