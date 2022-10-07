import { Router } from 'express';
import { signUp, updateUser } from '../controllers/usersController';
import schemaValidation from '../middlewares/schemaValidation';
import tokenValidation from '../middlewares/tokenValidation';
import signUpSchema from '../schemas/signUpSchema';
import updateUserSchema from '../schemas/updateUserSchema';

const userRouter = Router();
userRouter.post(
  '/sign-up', 
  schemaValidation(signUpSchema), 
  signUp
);
userRouter.put(
  '/users/update',
  tokenValidation,
  schemaValidation(updateUserSchema),
  updateUser
);
export default userRouter;