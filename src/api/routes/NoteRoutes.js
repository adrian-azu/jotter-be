'use strict';

const express = require('express');
const router = express.Router();
const NoteController = require('../controller/NoteController');
const auth = require('../middleware/authMidleware');
router.route('/').get(auth.jwtToken, NoteController.index).post(auth.jwtToken, NoteController.create);
router
  .route('/:id')
  .get(auth.jwtToken, NoteController.show)
  .put(auth.jwtToken, NoteController.update)
  .delete(auth.jwtToken, NoteController.delete);
  
module.exports = router;
