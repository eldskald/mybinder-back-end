import { Router } from 'express';
import { signUp, updateDisplayname } from '../controllers/usersController';
import schemaValidation from '../middlewares/schemaValidation';
import tokenValidation from '../middlewares/tokenValidation';
import signUpSchema from '../schemas/signUpSchema';
import changeDisplaynameSchema from '../schemas/changeDisplaynameSchema';

const userRouter = Router();
userRouter.post(
  '/sign-up', 
  schemaValidation(signUpSchema), 
  signUp
);
userRouter.post(
  '/users/:id/changeDisplayname',
  tokenValidation,
  schemaValidation(changeDisplaynameSchema),
  updateDisplayname
);
export default userRouter;