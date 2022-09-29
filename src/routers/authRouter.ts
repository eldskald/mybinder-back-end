import { Router } from 'express';
import { signIn } from '../controllers/authController';
import schemaValidation from '../middlewares/schemaValidation';
import signInSchema from '../schemas/signInSchema';

const authRouter = Router();
authRouter.post(
  '/sign-in', 
  schemaValidation(signInSchema), 
  signIn
);
export default authRouter;