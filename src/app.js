const express = require('express');

const artistRouter = require('./controllers/artist')

const app = express();
app.use(express.json());

app.use('/artist', artistRouter)

app.get('/', (req, res) => {
  res.status(200).send("Hello world!");
});

module.exports = app;