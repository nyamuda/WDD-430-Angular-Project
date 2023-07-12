import { Schema, model } from 'mongoose';

interface IMessage {
  id: string;
  name: string;
  subject: string;
  msgText: string;
  sender: String;
}

let messageSchema = new Schema<IMessage>(
  {
    id: String,
    subject: String,
    msgText: String,
    sender: String,
  },
  {
    timestamps: true,
  }
);

//create a user model

let Message = model<IMessage>('Message', messageSchema, 'messages');

export { Message, messageSchema };
