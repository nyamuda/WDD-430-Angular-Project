import { Request, Response } from 'express';
import * as express from 'express';
import * as Controller from '../controllers';

const router = express.Router();

router
  .route('/')
  .get((req: Request, res: Response) => {
    Controller.getDocuments(req, res);
  })
  .post((req: Request, res: Response) => {
    Controller.createDocument(req, res);
  })
  .put((req: Request, res: Response) => {
    Controller.updateDocument(req, res);
  });
router.route('/:id').delete((req: Request, res: Response) => {
  Controller.deleteDocument(req, res);
});

export { router as DocumentsRouter };
