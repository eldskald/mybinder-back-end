import { Router } from 'express';
import {
  getPage,
  getUserPages,
  postPage,
  patchPage,
  deletePage
} from '../controllers/pagesController';
import tokenValidation from '../middlewares/tokenValidation';
import schemaValidation from '../middlewares/schemaValidation';
import createPageSchema from '../schemas/createPageSchema';
import updatePageSchema from '../schemas/updatePageSchema';

const pageRouter = Router();
pageRouter.get(
  '/pages/:pageId',
  getPage
);
pageRouter.get(
  '/pages',
  tokenValidation,
  getUserPages
);
pageRouter.post(
  '/pages',
  tokenValidation,
  schemaValidation(createPageSchema),
  postPage
);
pageRouter.patch(
  '/pages/:pageId',
  tokenValidation,
  schemaValidation(updatePageSchema),
  patchPage
);
pageRouter.delete(
  '/pages/:pageId',
  tokenValidation,
  deletePage
);
export default pageRouter;