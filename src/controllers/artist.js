const express = require('express');
const { createArtistRoute, findArtistRoute, findArtistByIdRoute, updateArtistRoute, deleteArtistRoute } = require('../routes/artist');

const artistRouter = express.Router();


artistRouter.route('/')
.post(createArtistRoute)
.get(findArtistRoute);

artistRouter.route('/:id')
.get(findArtistByIdRoute)
.patch(updateArtistRoute)
.delete(deleteArtistRoute);

module.exports = artistRouter;