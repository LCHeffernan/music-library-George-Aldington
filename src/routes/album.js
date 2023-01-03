const express = require('express');
const { readAlbum, readAlbumById, updateAlbumById } = require('../controllers/album');

const albumRouter = express.Router();

albumRouter.get('/', readAlbum);
albumRouter.route('/:id')
.get(readAlbumById)
.patch(updateAlbumById);


module.exports = albumRouter;