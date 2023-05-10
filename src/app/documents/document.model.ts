export class Document {
  private _id: number;
  private _name: string;
  private _description: string;
  private _url: string;
  private _children: Array<Document> = new Array<Document>();

  constructor(
    id: number,
    name: string,
    description: string,
    url: string,
    child: Document
  ) {
    this._id = id;
    this._name = name;
    this._description = description;
    this._url = url;
    this._children.push(child);
  }

  public getNumber(): number {
    return this._id;
  }

  public getName(): string {
    return this._name;
  }

  public getURL(): string {
    return this._url;
  }

  public getChildren(): Array<Document> {
    return this._children;
  }
}
