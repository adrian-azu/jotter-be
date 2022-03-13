'use strict';

const server = require('./src/app');
const port = process.env.PORT || 3002;
const connectDB = require('./src/database/mongodb');

connectDB();
server.listen(port, () => {
  console.log(`This app listening at http://127.0.0.1:${port}`);
});
