import express from 'express';
import { get, add, destroy } from '../controllers/comment';

// Route: /user/:username/wish/:wish_id/comment
const commentRouter = express.Router({ mergeParams: true });

commentRouter.get('/', get);
commentRouter.post('/', add);
commentRouter.delete('/:comment_id', destroy);

export default commentRouter;
