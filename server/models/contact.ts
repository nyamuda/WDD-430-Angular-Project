import { Schema, model } from 'mongoose';

interface IContact {
  id: string;
  name: string;
  email: string;
  phone: string;
  imgUrl: string;
}

let contactSchema = new Schema<IContact>(
  {
    id: String,
    name: String,
    email: String,
    phone: String,
    imgUrl: String,
  },
  {
    timestamps: true,
  }
);

//create a user model

let Contact = model<IContact>('Contact', contactSchema, 'contacts');

export { Contact, contactSchema };
