'use strict';

const express = require('express');
const router = express.Router();
router.get('/', (req, res) => {
  return res.json('jotter app');
});


module.exports = router;
