const express = require('express');
const { createArtist, findArtist, findArtistById, updateArtist, deleteArtist } = require('../controllers/artist');
const createAlbum = require('../controllers/album');

const artistRouter = express.Router();


artistRouter.route('/')
.post(createArtist)
.get(findArtist);

artistRouter.route('/:id')
.get(findArtistById)
.patch(updateArtist)
.delete(deleteArtist);

artistRouter.post('/:id/albums/', createAlbum);

module.exports = artistRouter;