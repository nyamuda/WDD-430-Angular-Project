import { Document } from '../models';
import { Request, Response } from 'express';

//READ
//get all posts written by the author
export let getDocuments = async (req: Request, res: Response) => {
  try {
    let documents = await Document.find({});
    return res.json(documents);
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Sorry, the operation failed.', error: err });
  }
};

//CREATE
export let createDocument = async (req: Request, res: Response) => {
  let documentBody = {
    id: req.body.id,
    name: req.body.name,
    url: req.body.url,
  };
  Document.create(documentBody)
    .then((document) => {
      return res.status(201).json({
        message: 'The document was successfully created.',
        _id: document._id,
      });
    })
    .catch((err) => {
      return res
        .status(500)
        .json({ message: 'Sorry, the operation failed.', error: err });
    });
};

//UPDATE
export let updateDocument = async (req: Request, res: Response) => {
  try {
    let content = {
      id: req.body.id,
      name: req.body.name,
      url: req.body.url,
    };

    Document.updateOne({ id: content.id }, content).then(async (document) => {
      return res
        .status(204)
        .json({ message: 'Document updated successfully.' });
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Sorry, the operation failed.', error: error });
  }
};

//DELETE
export let deleteDocument = async (req: Request, res: Response) => {
  try {
    console.log(req.params['id']);
    Document.deleteOne({ id: req.params['id'] }).then(async (document) => {
      return res
        .status(204)
        .json({ message: 'Document deleted successfully.' });
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Sorry, the operation failed.', error: error });
  }
};
