import { Router } from 'express';
import authRouter from './routers/authRouter';
import userRouter from './routers/usersRouter';
import pageRouter from './routers/pagesRouter';
import entriesRouter from './routers/entriesRouter';

const router = Router();
router.use(authRouter);
router.use(userRouter);
router.use(pageRouter);
router.use(entriesRouter);
export default router;