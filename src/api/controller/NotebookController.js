'use strict';

const _ = require('lodash');
const Notebook = require('../model/NoteBook');
const { errorHandler } = require('../helper/handler');

class NotebookController {
  async index(req, res) {
    try {
      const { _id } = req.user;
      const { search, sort, sortValue } = req.query;
      const result = await Notebook.getUserNotebooks(_id, search, sort, sortValue);
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
      const { _id } = req.user;
      const { id } = req.params;
      const result = await Notebook.getNotebookDetails(_id, id);
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
      const { _id } = req.user;
      const { title, cover } = req.body;
      const result = await Notebook.createNotebooks({ userId: _id, title, cover });
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
      const { title, cover } = req.body;
      const result = await Notebook.updateNotebook(id, { title, cover });
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
      const { _id } = req.user;
      const { id } = req.params;
      const notebook = await Notebook.getNotebookDetails(_id, id);
      if (!notebook)
        return res.status(404).json({
          status: 'fail',
          data: result,
        });
      const result = await Notebook.deleteNotebooks(id);
      return res.status(200).json({
        status: 'success',
        data: result,
      });
    } catch (error) {
      return errorHandler(res, error);
    }
  }
}

module.exports = new NotebookController();
