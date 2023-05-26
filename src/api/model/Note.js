'use strict';
const mongoose = require('mongoose');
const NotesModel = require('../schema/NoteSchema');
const ObjectId = mongoose.Types.ObjectId;
class Note {
  getUserNotes(notebookId = '', search = '', sort = '', sortValue = Number) {
    sort = sort ?? { sort: sortValue };
    return new Promise(async (resolve, reject) => {
      try {
        const res = await NotesModel.aggregate(
          [
            {
              $match: {
                $and: [
                  {
                    notebookId: ObjectId(notebookId),
                  },
                  {
                    title: {
                      $regex: `*.${search||""}*.`,
                    },
                  },
                ],
              },
            },
            {
              $sort: { createdAt: -1 },
            },
          ],
          // { images: { $slice: 1 } }
        ).allowDiskUse(true);
        return resolve(res);
      } catch (error) {
        return reject(error);
      }
    });
  }

  createNotes(body = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await NotesModel.create(body);
        return resolve(res);
      } catch (error) {
        return reject(error);
      }
    });
  }

  getNoteDetails(id = '') {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await NotesModel.findById(id);
        return resolve(res);
      } catch (error) {
        return reject(error);
      }
    });
  }

  updateNotes(id = '', body = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await NotesModel.findByIdAndUpdate(id, body, {
          upsert: true,
          new: true,
        });
        return resolve(res);
      } catch (error) {
        return reject(error);
      }
    });
  }

  deleteNote(id = '') {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await NotesModel.findByIdAndDelete(id);
        return resolve(res);
      } catch (error) {
        return reject(error);
      }
    });
  }
}

module.exports = new Note();
