import { Message } from '../models';
import { Request, Response } from 'express';

//READ
//get all posts written by the author
export let getMessages = async (req: Request, res: Response) => {
  try {
    let messages = await Message.find({});
    return res.json(messages);
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Sorry, the operation failed.', error: err });
  }
};

//CREATE
export let createMessage = async (req: Request, res: Response) => {
  let messageBody = {
    id: req.body.id,
    subject: req.body.subject,
    msgText: req.body.msgText,
    sender: req.body.sender,
  };
  Message.create(messageBody)
    .then((message) => {
      return res.status(201).json({
        message: 'Message created successfully.',
        _id: message._id,
      });
    })
    .catch((err) => {
      return res
        .status(500)
        .json({ message: 'Sorry, the operation failed.', error: err });
    });
};

//UPDATE
export let updateMessage = async (req: Request, res: Response) => {
  try {
    let content = {
      id: req.body.id,
      subject: req.body.subject,
      msgText: req.body.msgText,
      sender: req.body.sender,
    };

    Message.updateOne({ id: content.id }, content).then(async (Message) => {
      return res.status(204).json({ message: 'Message updated successfully.' });
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Sorry, the operation failed.', error: error });
  }
};

//DELETE
export let deleteMessage = async (req: Request, res: Response) => {
  try {
    Message.deleteOne({ id: req.params['id'] }).then(async (Message) => {
      return res.status(204).json({ message: 'Message deleted successfully.' });
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Sorry, the operation failed.', error: error });
  }
};
