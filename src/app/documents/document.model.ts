// export class Document {
//   private _id: string;
//   private _name: string;
//   private _description: string;
//   private _url: string;
//   private _children: Array<Document> = new Array<Document>();

//   constructor(
//     id: string = '',
//     name: string = '',
//     description: string = '',
//     url: string = ''
//   ) {
//     this._id = id;
//     this._name = name;
//     this._description = description;
//     this._url = url;
//   }

//   public get id(): string {
//     return this._id;
//   }

//   public get name(): string {
//     return this._name;
//   }

//   public get description(): string {
//     return this._description;
//   }

//   public get url(): string {
//     return this._url;
//   }

//   public get children(): Document[] {
//     return this._children;
//   }

//   public set name(name: string) {
//     this._name = name;
//   }

//   public set url(url: string) {
//     this._url = url;
//   }
//   public set children(children: Document[]) {
//     this._children = children;
//   }

//   public set id(id: string) {
//     this._id = id;
//   }
// }

export class Document {
  public id: string;
  public name: string;
  public description: string;
  public url: string;
  public children: Array<Document> = new Array<Document>();

  constructor(
    id: string = '',
    name: string = '',
    description: string = '',
    url: string = '',
    children: Document[] = new Array<Document>()
  ) {
    this.id = id;
    this.name = name;
    this.url = url;
    this.description = description;
    this.children = children;
  }
}
