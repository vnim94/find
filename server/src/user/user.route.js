const controller = require('./user.controller');
const express = require('express');
const router = express.Router();

router.get('/login', controller.login);
router.get('/register', controller.register);

module.exports = router;
