export class Contact {
  private _id: string;
  private _name: string;
  private _email: string;
  private _phone: string;
  private _imageUrl: string;
  private _group: Array<any> = new Array<any>();

  constructor(
    id: string = '',
    name: string = '',
    email: string = '',
    phone: string = '',
    imageUrl: string = '',
    group: any = ''
  ) {
    this._id = id;
    this._name = name;
    this._email = email;
    this._phone = phone;
    this._imageUrl = imageUrl;

    this._group.push(group);
  }

  public get id(): string {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }
  public getEmail(): string {
    return this._email;
  }

  public getPhone(): string {
    return this._phone;
  }
  public get imageURL(): string {
    return this._imageUrl;
  }

  public get group(): Array<any> {
    if (!this._group) {
      return [];
    }
    return this._group;
  }

  public set id(id: string) {
    this._id = id;
  }
}
