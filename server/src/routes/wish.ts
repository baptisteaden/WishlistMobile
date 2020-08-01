import express from 'express';
import { get, add, update, destroy, shop } from '../controllers/wish';

// Route: /user/:username/wish
const wishRouter = express.Router({ mergeParams: true });

wishRouter.get('/', get);
wishRouter.post('/', add);
wishRouter.put('/:wish_id', update);
wishRouter.delete('/:wish_id', destroy);
wishRouter.post('/:wish_id/shop', shop);

export default wishRouter;
