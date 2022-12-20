const express = require('express');
const { createArtistRoute, findArtistRoute, findArtistByIdRoute, updateArtistRouter } = require('../routes/artist');

const artistRouter = express.Router();


artistRouter.route('/')
.post(createArtistRoute)
.get(findArtistRoute)

artistRouter.get('/:id', findArtistByIdRoute);

artistRouter.patch('/:id', updateArtistRouter);

module.exports = artistRouter;