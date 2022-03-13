const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();
const app = express();
const server = require('http').createServer(app);
const { io } = require('./api/helper/handler');
io.attach(server, {
  cors: {
    methods: ['GET', 'POST'],
    transports: ['websocket', 'polling'],
    credentials: true,
  },
  allowEIO3: true,
});

const VERSION = process.env.VERSION || 1;
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const indexRouter = require('./api/routes/index');
const nodeRouter = require('./api/routes/NoteRoutes');
const userRoutes = require('./api/routes/UserRoutes');
app.use('/notebook', require('./api/routes/NotebookRoutes'));
app.use('/user', userRoutes);
app.use('/note', nodeRouter);
app.use(`/api/v${VERSION}`, indexRouter);

module.exports = server;
