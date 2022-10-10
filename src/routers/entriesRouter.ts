import { Router } from 'express';
import {
  getEntries,
  postEntry,
  putEntry,
  moveUpEntry,
  moveDownEntry
} from '../controllers/entriesController';
import tokenValidation from '../middlewares/tokenValidation';
import schemaValidation from '../middlewares/schemaValidation';
import entrySchema from '../schemas/entrySchema';

const entriesRouter = Router();
entriesRouter.get(
  '/entries/:username/:pagename',
  getEntries
);
entriesRouter.post(
  '/entries/:pageId',
  tokenValidation,
  postEntry
);
entriesRouter.put(
  '/entries/:pageId/:entryId',
  tokenValidation,
  schemaValidation(entrySchema),
  putEntry
);
entriesRouter.patch(
  '/entries/move-up/:pageId/:entryId',
  tokenValidation,
  moveUpEntry
);
entriesRouter.patch(
  '/entries/move-down/:pageId/:entryId',
  tokenValidation,
  moveDownEntry
);
export default entriesRouter;