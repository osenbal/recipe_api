export default interface CommonUser {
  id?: number;
  user_id: number;
  name: string;
  profile_url?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export const getNameFromEmail = (email: string): string => {
  return email.split("@")[0];
};
