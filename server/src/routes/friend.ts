import express from 'express';
import { get, add, destroy } from '../controllers/friend';

// Route: /user/:username/friend
const friendRouter = express.Router({ mergeParams: true });

friendRouter.get('/', get);
friendRouter.post('/', add);
friendRouter.delete('/:friend_name', destroy);

export default friendRouter;
