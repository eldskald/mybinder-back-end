import { Router } from 'express';
import {
  getPage,
  getUserPages,
  postPage,
  changePageTitle,
  deletePage
} from '../controllers/pagesController';
import tokenValidation from '../middlewares/tokenValidation';
import schemaValidation from '../middlewares/schemaValidation';
import pageTitleSchema from '../schemas/pageTitleSchema';

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
  schemaValidation(pageTitleSchema),
  postPage
);
pageRouter.patch(
  '/pages/changeTitle/:pageId',
  tokenValidation,
  schemaValidation(pageTitleSchema),
  changePageTitle
);
pageRouter.delete(
  '/pages/:pageId',
  tokenValidation,
  deletePage
);
export default pageRouter;