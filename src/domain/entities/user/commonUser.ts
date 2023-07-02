import Entity from "../entity.abstract";
export default interface ICommonUser {
  user_id: number;
  name: string;
  profile_url: string;
}

export class CommonUser extends Entity<ICommonUser> {
  constructor(props: ICommonUser, id: number | null) {
    super(props, id);
  }

  public static create(props: ICommonUser, id: number | null) {
    const { user_id, name, profile_url } = props;

    return new CommonUser(
      {
        user_id,
        name,
        profile_url,
      },
      id
    );
  }

  get user_id(): number {
    return this.props.user_id;
  }

  get name(): string {
    return this.props.name;
  }

  get profile_url(): string {
    return this.props.profile_url;
  }

  set user_id(user_id: number) {
    this.props.user_id = user_id;
  }

  set name(name: string) {
    this.props.name = name;
  }

  set profile_url(profile_url: string) {
    this.props.profile_url = profile_url;
  }
}
