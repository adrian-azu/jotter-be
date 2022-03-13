'use strict';

const express = require('express');
const router = express.Router();

const nodeRouter = require('./NoteRoutes');
const userRoutes = require('./UserRoutes');

router.use('/notebook', require('./NotebookRoutes'));
router.use('/user', userRoutes);
router.use('/note', nodeRouter);

router.get('/', (req, res) => {
  return res.json('jotter app');
});


module.exports = router;
