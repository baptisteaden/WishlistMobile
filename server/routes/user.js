const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.post('/', userController.signIn);

module.exports = router;
