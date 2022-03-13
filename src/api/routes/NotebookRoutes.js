'use strict';

const express = require('express');
const router = express.Router();
const NotebookController = require('../controller/NotebookController');
const auth = require('../middleware/authMidleware');
router.route('/').get(auth.jwtToken, NotebookController.index).post(auth.jwtToken, NotebookController.create);
router
  .route('/:id')
  .get(auth.jwtToken, NotebookController.show)
  .put(auth.jwtToken, NotebookController.update)
  .delete(auth.jwtToken, NotebookController.delete);
module.exports = router;
