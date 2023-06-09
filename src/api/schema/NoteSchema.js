'use strict';

const mongoose = require('mongoose');
const moment = require('moment-timezone');

const NoteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  notebookId: {
    type: mongoose.Types.ObjectId,
    ref: 'notebooks',
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: false,
  },
  background: {
    type: String,
    required: false
  },
  bookmarked: {
    type: Boolean,
    required: false,
  },
  images: [
    {
      name: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: moment().tz('Asia/Manila').format(),
  },
  updatedAt: {
    type: Date,
    default: null,
  },
});

NoteSchema.pre(
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

const Notes = mongoose.model('notes', NoteSchema);

module.exports = Notes;
