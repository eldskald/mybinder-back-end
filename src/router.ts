import { Router } from 'express';
import authRouter from './routers/authRouter';
import userRouter from './routers/usersRouter';
import pageRouter from './routers/pagesRouter';

const router = Router();
router.use(authRouter);
router.use(userRouter);
router.use(pageRouter);
export default router;