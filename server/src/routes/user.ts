import express from 'express';
import { signIn } from '../controllers/user';

// Route: /user
const userRouter = express.Router();

userRouter.post('/', signIn);

export default userRouter;
