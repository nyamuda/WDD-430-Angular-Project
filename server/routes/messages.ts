import { Request, Response } from 'express';
import * as express from 'express';
import * as Controller from '../controllers';

const router = express.Router();

router
  .route('/')
  .get((req: Request, res: Response) => {
    Controller.getMessages(req, res);
  })
  .post((req: Request, res: Response) => {
    Controller.createMessage(req, res);
  })
  .put((req: Request, res: Response) => {
    Controller.updateMessage(req, res);
  });
router.route('/:id').delete((req: Request, res: Response) => {
  Controller.deleteMessage(req, res);
});
export { router as MessagesRouter };
