'use strict';

const mongoose = require('mongoose');
const moment = require('moment-timezone');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: false,
    default: null,
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: function () {
      return this.uid == null;
    },
    minlength: [6, 'Minimum password length is 6'],
    default: null,
  },
  createdAt: {
    type: Date,
    default: moment().tz('Asia/Manila').format(),
  },
  updatedAt: {
    type: Date,
    default: null,
  },
});

UserSchema.pre(['update', 'updateOne', 'updateMany', 'findOneAndUpdate', 'findByIdAndUpdate'], function (next) {
  this._update.updatedAt = moment().tz('Asia/Manila').format();
  next();
});

UserSchema.pre('save', async function (next) {
  if (!this.password) {
    next();
  }
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.post('save', async function (doc, next) {
  if (!doc._doc.password) {
    next();
  }
  delete doc._doc.password;
  next();
});

UserSchema.methods.isValidpassword = function (password) {
  const user = this;
  const compare = bcrypt.compareSync(password, user.password);

  return compare;
};

UserSchema.methods.generateAuthToken = function () {
  delete this._doc.password;
  const expiration = process.env.JWT_EXPIRATION || '12h';
  const secret = process.env.JWT_SECRET || 'jotter-secret-key';
  const token = jwt.sign(this._doc, secret, { expiresIn: expiration });
  return token;
};

const User = mongoose.model('users', UserSchema);

module.exports = User;
