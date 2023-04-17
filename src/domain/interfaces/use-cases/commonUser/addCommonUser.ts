import CommonUser from "@domain/entities/user/commonUser";

export interface AddCommonUserUseCase {
  execute(user: CommonUser): Promise<boolean>;
}
