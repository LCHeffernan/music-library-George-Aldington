const express = require('express');
const artistRoute = require('../routes/artist');

const artistRouter = express.Router();

artistRouter.post('/', artistRoute)

module.exports = artistRouter;