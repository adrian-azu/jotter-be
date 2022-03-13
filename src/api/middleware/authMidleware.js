const jwt = require('jsonwebtoken');
const _ = require('lodash');
const moment = require('moment-timezone');
const config = process.env;
const User = require('../model/User');
const jwtToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(403).json({
      message: 'No session found!',
      status: 'failed',
      data: null,
    });
  }
  const values = token.split(' ')[1];
  if (!values) {
    return res.status(403).json({
      message: 'No session found!',
      status: 'failed',
      data: null,
    });
  }

  try {
    const payload = jwt.decode(values, config.JWT_SECRET);
    if (payload.exp < moment().unix()) {
      return res.status(401).json({
        message: 'Session expired!',
        status: 'failed',
        data: null,
      });
    }

    const user = await User.getUserById(payload._id);
    if (!user) {
      return res.status(401).send({
        message: 'Not valid token!',
        status: 'failed',
        data: null,
      });
    }
    req.user = payload;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).send({
      message: 'Not valid token!',
      status: 'failed',
      data: null,
    });
  }
};

const guest = (req, res, next) => {
  const token = req.headers['x-auth-token'] || req.headers['authorization'];
  if (!_.isEmpty(token)) {
    return res.status(401).json({
      message: 'Session found',
      status: 'failed',
      data: null,
    });
  }
  next();
};
module.exports = { jwtToken, guest };
