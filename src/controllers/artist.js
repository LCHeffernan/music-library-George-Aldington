const express = require('express');
const { createArtistRoute, findArtistRoute, findArtistByIdRoute }= require('../routes/artist');

const artistRouter = express.Router();


artistRouter.route('/')
.post(createArtistRoute)
.get(findArtistRoute)

artistRouter.get('/:id', findArtistByIdRoute);

module.exports = artistRouter;