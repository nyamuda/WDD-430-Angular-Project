import { Request, Response } from 'express';
import * as express from 'express';
import * as Controller from '../controllers';

const router = express.Router();

router
  .route('/')
  .get((req: Request, res: Response) => {
    Controller.getContacts(req, res);
  })
  .post((req: Request, res: Response) => {
    Controller.createContact(req, res);
  })
  .put((req: Request, res: Response) => {
    Controller.updateContact(req, res);
  });
router.route('/:id').delete((req: Request, res: Response) => {
  Controller.deleteContact(req, res);
});

export { router as ContactsRouter };
