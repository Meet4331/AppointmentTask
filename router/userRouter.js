const express = require('express');
const router = new express.Router();
const userController = require('../controller/userController');
const { authentication } = require('../middleware/auth');

router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/getUser',authentication, userController.getUsers)



module.exports = router;