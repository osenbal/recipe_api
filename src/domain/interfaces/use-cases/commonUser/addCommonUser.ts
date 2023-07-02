import ICommonUser from "@domain/entities/user/commonUser";

export interface AddCommonUserUseCase {
  execute(user: ICommonUser): Promise<boolean>;
}
