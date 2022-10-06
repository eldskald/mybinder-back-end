import { Router } from 'express';
import { signIn, signInFromToken } from '../controllers/authController';
import tokenValidation from '../middlewares/tokenValidation';
import schemaValidation from '../middlewares/schemaValidation';
import signInSchema from '../schemas/signInSchema';

const authRouter = Router();
authRouter.post(
  '/sign-in', 
  schemaValidation(signInSchema), 
  signIn
);
authRouter.get(
  '/sign-in-from-token',
  tokenValidation,
  signInFromToken 
);
export default authRouter;