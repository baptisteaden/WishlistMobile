const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment');

router.get('/:wish_id', commentController.get);
router.post('/:wish_id', commentController.add);
router.delete('/:comment_id', commentController.destroy);

module.exports = router;
