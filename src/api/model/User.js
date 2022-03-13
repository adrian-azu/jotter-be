'use strict';

const mongoose = require('mongoose');
const UserSchema = require('../schema/UserSchema');
const ObjectId = mongoose.Types.ObjectId;

class User {
  create(body = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await UserSchema.create(body);
        return resolve(res);
      } catch (error) {
        return reject(error);
      }
    });
  }
  getUserByUsername(username = '') {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await UserSchema.findOne({ username: username });
        return resolve(res);
      } catch (error) {
        return reject(res);
      }
    });
  }
  getUserById(id = ObjectId) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await UserSchema.findById(id);
        return resolve(res);
      } catch (error) {
        return reject(res);
      }
    });
  }

  getUserByUid(uid = '') {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await UserSchema.findOne({
          uid: uid,
        });
        return resolve(res);
      } catch (error) {
        return reject(res);
      }
    });
  }

  updateUserById(id = ObjectId, body = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await UserSchema.findByIdAndUpdate(id, body, { new: true });
        return resolve(res);
      } catch (error) {
        return reject(res);
      }
    });
  }
}

module.exports = new User();
