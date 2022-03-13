'use strict';

const Note = require('../model/Note');
const { errorHandler, Socket } = require('../helper/handler');

class NoteController {
  async index(req, res) {
    try {
      const { _id } = req.user;
      const result = await Note.getUserNotes(_id);
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
      const { notebookId, title, content, images } = req.body;

      const result = await Note.createNotes({ notebookId, title, content, images });
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
      const { title, content, images } = req.body;
      let result;
      Socket.on('update_note', async (data) => {
        console.log('here')
        const { id, title, content, images } = data;
        result = await Note.updateNotes(id, { title, content, images });
        Socket.emit('updated_note', result);
      });
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
