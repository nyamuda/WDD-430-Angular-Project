export class Message {
  private _id: number;
  private _subject: string;
  private _msgText: string;
  private _sender: string;

  constructor(id: number, subject: string, msgText: string, sender: string) {
    this._id = id;
    this._subject = subject;
    this._msgText = msgText;
    this._sender = sender;
  }

  public getId(): number {
    return this._id;
  }

  public getSubject(): string {
    return this._subject;
  }

  public getMessageText(): string {
    return this._msgText;
  }

  public getSender(): string {
    return this._sender;
  }
}
