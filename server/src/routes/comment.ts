import express from 'express';
import { get, add, destroy } from '../controllers/comment';

const commentRouter = express.Router();

commentRouter.get('/:wish_id', get);
commentRouter.post('/:wish_id', add);
commentRouter.delete('/:comment_id', destroy);

export default commentRouter;
