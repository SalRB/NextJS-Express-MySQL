const express = require('express');
const router = express.Router();
const userController = require('../../controllers/controller_user');

router.get('/', userController.loadUser);
router.get('/:user', userController.getUser);
router.post('/register', userController.register);
router.post('/login', userController.login);

module.exports = router;