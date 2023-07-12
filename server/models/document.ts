import { Schema, model } from 'mongoose';

interface IDocument {
  id: string;
  name: string;
  description: string;
  url: string;
  children: Array<object>;
}

let documentSchema = new Schema<IDocument>(
  {
    id: String,
    name: String,
    description: String,
    url: String,
    children: [Object],
  },
  {
    timestamps: true,
  }
);

//create a user model

let Document = model<IDocument>('Document', documentSchema, 'documents');

export { Document, documentSchema };
