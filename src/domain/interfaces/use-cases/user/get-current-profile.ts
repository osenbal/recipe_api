// import IUser from "@domain/entities/auth/user";
// import CommonUser from "@domain/entities/user/commonUser";
// import Chef from "@domain/entities/user/chef";

export interface GetCurrentProfileUseCase {
  executeByUserId(user_id: number): Promise<any>;
  executeByCommonUserId(commonUser_id: number): Promise<any>;
  executeByChefId(chef_id: number): Promise<any>;
}
