import express from 'express';
import { get, add, destroy } from '../controllers/friend';

const friendRouter = express.Router();

friendRouter.get('/:username', get);
friendRouter.post('/:username', add);
friendRouter.delete('/:username/:friend_name', destroy);

export default friendRouter;
