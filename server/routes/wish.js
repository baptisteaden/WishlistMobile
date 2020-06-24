const express = require('express');
const router = express.Router();
const wishController = require('../controllers/wish');

router.get('/:username', wishController.get);
router.post('/:username', wishController.add);
router.put('/:username/:wish_id', wishController.update);
router.delete('/:username/:wish_id', wishController.destroy);

module.exports = router;
