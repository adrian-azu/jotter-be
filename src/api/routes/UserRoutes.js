'use strict';

const express = require('express');
const route = express.Router();
const UserController = require('../controller/UserController');
const auth = require('../middleware/authMidleware');

route.post('/auth/register', auth.guest, UserController.register);
route.post('/auth/login', auth.guest, UserController.login);
route.post('/auth/login/sns', auth.guest, UserController.snsLogin);
route.post('/update', auth.jwtToken, UserController.update);
module.exports = route;
