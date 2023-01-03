const express = require('express');
const artistRouter = require('./routes/artist');
const albumRouter = require('./routes/album');

const app = express();
app.use(express.json());

app.use('/artists', artistRouter);
app.use('/albums', albumRouter);

app.get('/', (req, res) => {
  res.status(200).send("Hello world!");
});

module.exports = app;