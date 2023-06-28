export class Contact {
  private _id: number;
  private _name: string;
  private _email: string;
  private _phone: string;
  private _imageUrl: string;
  private _group: Array<any> = new Array<any>();

  constructor(
    id: number,
    name: string,
    email: string,
    phone: string,
    imageUrl: string,
    group: any
  ) {
    this._id = id;
    this._name = name;
    this._email = email;
    this._phone = phone;
    this._imageUrl = imageUrl;

    this._group.push(group);
  }

  public get id(): number {
    return this._id;
  }

  public getName(): string {
    return this._name;
  }
  public getEmail(): string {
    return this._email;
  }

  public getPhone(): string {
    return this._phone;
  }
  public getImageUrl(): string {
    return this._imageUrl;
  }

  public getGroup(): Array<any> {
    return this._group;
  }
}
