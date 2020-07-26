import express from 'express';
import { get, add, update, destroy, shop } from '../controllers/wish';

const wishRouter = express.Router();

wishRouter.get('/:username', get);
wishRouter.post('/:username', add);
wishRouter.put('/:username/:wish_id', update);
wishRouter.delete('/:username/:wish_id', destroy);

wishRouter.post('/:wish_id/shop', shop);

export default wishRouter;
