'use strict';
const mongoose = require('mongoose');
const NotesModel = require('../schema/NoteSchema');
const ObjectId = mongoose.Types.ObjectId;
class Note {
  getUserNotes(notebookId = '', search = '', sort = '', sortValue = Number) {
    search = search ?? {
      $regex: '*.*.',
    };
    sort = sort ?? { sort: sortValue };
    return new Promise(async (resolve, reject) => {
      try {
        const res = await NotesModel.find(
          {
            notebookId: ObjectId(notebookId),
            title: search,
          },
          { images: { $slice: 1 } }
        )
          .sort(sort)
          .select({ title: 1, images: 1, createdAt: 1, updatedAt: 1 });
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
