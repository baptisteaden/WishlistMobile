import express from 'express';
import { signIn } from '../controllers/user';

const userRouter = express.Router();

userRouter.post('/', signIn);

export default userRouter;
