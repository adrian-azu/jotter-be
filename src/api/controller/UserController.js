'use strict';
const User = require('../model/User');
const { errorHandler } = require('../helper/handler');
const _ = require('lodash')
class UserController {
  async register(req, res) {
    try {
      const { username, email, password } = req.body;
      const result = await User.create({ username, email, password });
      return res.status(201).json({ status: 'success', data: result });
    } catch (error) {
      return errorHandler(res, error);
    }
  }

  async update(req, res) {
    try {
      const { _id } = req.user;
      const { username, email, password } = req.body;
      const result = await User.updateUserById(_id, { username, email, password });
      return res.status(200).json({ status: 'success', data: result });
    } catch (error) {
      return errorHandler(res, error);
    }
  }

  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.getUserByUsername(username);
      if (!user) {
        return res.status(404).json({ status: 'failed', data: user });
      }
      if (!user.isValidpassword(password)) {
        return res.status(404).json({ status: 'failed', data: 'Invalid credentials' });
      }
      const token = user.generateAuthToken();
      return res.status(201).json({ status: 'success', data: token });
    } catch (error) {
      return errorHandler(res, error);
    }
  }

  async snsLogin(req, res) {
    try {
      const { username, uid, email } = req.body;
      const checkExist = await User.getUserByUid(uid);
      let token;
      if (!checkExist) {
        const newUser = await User.create({ uid, username, email });
        token = newUser.generateAuthToken();
      } else {
        token = checkExist.generateAuthToken();
      }
      return res.status(201).json({ status: 'success', data: token });
    } catch (error) {
      return errorHandler(res, error);
    }
  }
}

module.exports = new UserController();
