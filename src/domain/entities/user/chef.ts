export default interface Chef {
  id?: number;
  user_id: number;
  name: string;
  profile_url?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
