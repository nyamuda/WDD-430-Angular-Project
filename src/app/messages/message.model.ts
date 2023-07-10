export class Message {
  public id: number;
  public subject: string;
  public msgText: string;
  public sender: string;

  constructor(id: number, subject: string, msgText: string, sender: string) {
    this.id = id;
    this.subject = subject;
    this.msgText = msgText;
    this.sender = sender;
  }

  // public getId(): number {
  //   return this._id;
  // }

  // public getSubject(): string {
  //   return this._subject;
  // }

  // public getMessageText(): string {
  //   return this._msgText;
  // }

  // public getSender(): string {
  //   return this._sender;
  // }
}
