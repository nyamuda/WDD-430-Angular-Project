export class Contact {
  public id: string;
  public name: string;
  public email: string;
  public phone: string;
  public imageUrl: string;
  public group: Array<any> = new Array<any>();

  constructor(
    id: string = '',
    name: string = '',
    email: string = '',
    phone: string = '',
    imageUrl: string = '',
    group: any = ''
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.imageUrl = imageUrl;

    this.group.push(group);
  }

  // public get id(): string {
  //   return this._id;
  // }

  // public get name(): string {
  //   return this._name;
  // }
  // public getEmail(): string {
  //   return this._email;
  // }

  // public getPhone(): string {
  //   return this._phone;
  // }
  // public get imageURL(): string {
  //   return this._imageUrl;
  // }

  // public get group(): Array<any> {
  //   if (!this._group) {
  //     return [];
  //   }
  //   return this._group;
  // }

  // public set id(id: string) {
  //   this._id = id;
  // }
}
