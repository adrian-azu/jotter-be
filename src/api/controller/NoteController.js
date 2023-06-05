'use strict';

const Note = require('../model/Note');
const { errorHandler, Socket } = require('../helper/handler');
const _ = require('lodash');
class NoteController {
  async index(req, res) {
    try {
      const { _id } = req.user;
      const { notebookID, search, sort, sortValue } = req.query;
      const result = await Note.getUserNotes(notebookID, search, sort, sortValue);
      if (_.isEmpty(result)) {
        return res.status(404).json({
          status: 'fail',
          data: result,
        });
      } 
      return res.status(200).json({
        status: 'success',
        data: result,
      });
    } catch (error) {
      return errorHandler(res, error);
    }
  }
  async show(req, res) {
    try {
      const { id } = req.params;
      const result = await Note.getNoteDetails(id);
      if (_.isEmpty(result)) {
        return res.status(404).json({
          status: 'fail',
          data: result,
        });
      }
      return res.status(200).json({
        status: 'success',
        data: result,
      });
    } catch (error) {
      return errorHandler(res, error);
    }
  }

  async create(req, res) {
    try {
      const { notebookId, title, content, images, background, bookmarked } = req.body;

      const result = await Note.createNotes({ notebookId, title, content, images, background, bookmarked });
      return res.status(200).json({
        status: 'success',
        data: result,
      });
    } catch (error) {
      return errorHandler(res, error);
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { title, content, background, bookmarked } = req.body;
      const result = await Note.updateNotes(id, { title, content, background, bookmarked });
      // Socket.on('update_note', async (data) => {
      //   console.log('here');
      //   const { id, title, content, images } = data;
       
      //   Socket.emit('updated_note', result);
      // });
      if (!result)
        return res.status(404).json({
          status: 'fail',
          data: result,
        });

      return res.status(200).json({
        status: 'success',
        data: result,
      });
    } catch (error) {
      return errorHandler(res, error);
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const result = await Note.deleteNotebooks(id);
      if (!result)
        return res.status(404).json({
          status: 'fail',
          data: result,
        });
      return res.status(200).json({
        status: 'success',
        data: result,
      });
    } catch (error) {
      return errorHandler(res, error);
    }
  }
}

module.exports = new NoteController();
