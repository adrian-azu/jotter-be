'use strict';

const mongoose = require('mongoose');
const NotebookSchema = require('../schema/NotebookSchema');
const ObjectId = mongoose.Types.ObjectId;
class Notebook {
  getUserNotebooks(id, search = '', sort = '', sortValue = -1) {
    search = search ?? {
      $regex: '*.*.',
    };
    sort = sort ?? { sort: sortValue };
    return new Promise(async (resolve, reject) => {
      try {
        const res = await NotebookSchema.aggregate(
          [
            {
              $match: {
                $and: [
                  {
                    userId: ObjectId(id),
                  },
                  {
                    title: {
                      regex: `*.${search}*.`,
                    },
                  },
                ],
              },
            },
            {
              $sort: { createdAt: -1 },
            },
          ]
          // { images: { $slice: 1 } }
        ).allowDiskUse(true);
        return resolve(res);
      } catch (error) {
        return reject(error);
      }
    });
  }

  getNotebookDetails(userId, id) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await NotebookSchema.findOne({ userId: ObjectId(userId), _id: ObjectId(id) });
        return resolve(res);
      } catch (error) {
        return reject(error);
      }
    });
  }

  createNotebooks(body = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await NotebookSchema.create(body);
        return resolve(res);
      } catch (error) {
        return reject(error);
      }
    });
  }

  updateNotebook(id = '', body = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await NotebookSchema.findByIdAndUpdate(id, body, {
          upsert: true,
          new: true,
        });
        return resolve(res);
      } catch (error) {
        return reject(error);
      }
    });
  }

  deleteNotebooks(id = '') {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await NotebookSchema.findByIdAndDelete(id);
        return resolve(res);
      } catch (error) {
        return reject(error);
      }
    });
  }
}

module.exports = new Notebook();
