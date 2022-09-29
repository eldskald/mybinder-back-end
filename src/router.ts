import { Router } from 'express';
import authRouter from './routers/authRouter';
import userRouter from './routers/usersRouter';

const router = Router();
router.use(authRouter);
router.use(userRouter);
export default router;