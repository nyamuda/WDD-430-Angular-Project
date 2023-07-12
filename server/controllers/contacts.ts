import { Contact } from '../models';
import { Request, Response } from 'express';

//READ
//get all posts written by the author
export let getContacts = async (req: Request, res: Response) => {
  try {
    let contacts = await Contact.find({});
    return res.json(contacts);
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Sorry, the operation failed.', error: err });
  }
};
export let getContactById = async (id: string, res: Response) => {
  try {
    let contact = await Contact.findById(id);
    return res.json(contact);
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Sorry, the operation failed.', error: err });
  }
};
//CREATE
export let createContact = async (req: Request, res: Response) => {
  let contactBody = {
    id: req.body.id,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    imageUrl: req.body.imageUrl,
    group: req.body.group,
  };
  Contact.create(contactBody)
    .then((contact) => {
      return res.status(201).json({
        message: 'Contact was successfully created.',
        _id: contact._id,
      });
    })
    .catch((err) => {
      return res
        .status(500)
        .json({ message: 'Sorry, the operation failed.', error: err });
    });
};

//UPDATE
export let updateContact = async (req: Request, res: Response) => {
  try {
    let content = {
      id: req.body.id,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      imageUrl: req.body.imageUrl,
      group: req.body.group,
    };

    Contact.updateOne({ id: content.id }, content).then(async (Contact) => {
      return res.status(204).json({ message: 'Contact updated successfully.' });
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Sorry, the operation failed.', error: error });
  }
};

//DELETE
export let deleteContact = async (req: Request, res: Response) => {
  try {
    Contact.deleteOne({ id: req.params['id'] }).then(async (Contact) => {
      return res.status(204).json({ message: 'Contact deleted successfully.' });
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Sorry, the operation failed.', error: error });
  }
};
