const express = require('express');
const router = express.Router();
const friendController = require('../controllers/friend');

router.get('/:username', friendController.get);
router.post('/:username', friendController.add);
router.delete('/:username/:friend_name', friendController.remove);

module.exports = router;
