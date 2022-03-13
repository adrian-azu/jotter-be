'use strict';

const mongoose = require('mongoose');
const moment = require('moment-timezone');

const NotebookSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  cover: {
    type: String,
    required: true,
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

NotebookSchema.pre(
  [
    'update',
    'updateOne',
    'updateMany',
    'findOneAndUpdate',
    'findByIdAndUpdate',
  ],
  function (next) {
    this._update.updatedAt = moment().tz('Asia/Manila').format();
    next();
  }
);

const Notebooks = mongoose.model('notebooks', NotebookSchema);

module.exports = Notebooks;
