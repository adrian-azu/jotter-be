'use strict';

const mongoose = require('mongoose');
const { MONGO_DB } = process.env;
const db = async () => {
  try {
    const connect = await mongoose.connect(MONGO_DB, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(`connected to: ${connect.connection.host}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = db;
