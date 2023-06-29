export class Document {
  private _id: string;
  private _name: string;
  private _description: string;
  private _url: string;
  private _children: Array<Document> = new Array<Document>();

  constructor(id: string, name: string, description: string, url: string) {
    this._id = id;
    this._name = name;
    this._description = description;
    this._url = url;
  }

  public get id(): string {
    return this._id;
  }

  public getName(): string {
    return this._name;
  }

  public getDescription(): string {
    return this._description;
  }

  public getURL(): string {
    return this._url;
  }

  public getChildren(): Array<Document> {
    return this._children;
  }

  public setChildren(child: Document) {
    this._children.push(child);
  }

  public set id(id: string) {
    this._id = id;
  }
}
