import { v4 as uuidv4 } from "uuid";

const isEntity = (v: any): boolean => {
  return v instanceof Entity;
};

export default abstract class Entity<T> {
  protected _id: number;
  protected props: T;

  public constructor(props: T, id: number | null) {
    this._id = id ? id : parseInt(uuidv4(), 16);
    this.props = props;
  }

  get id(): number {
    return this._id;
  }

  public equals(obj: { [key: string]: any }): boolean {
    if (obj == null) {
      return false;
    }

    if (!isEntity(obj)) {
      return false;
    }

    return this.id === obj.id;
  }

  public toJSON() {
    return {
      id: this.id,
      ...this.props,
    };
  }

  public getProps(): T {
    return this.props;
  }
}
