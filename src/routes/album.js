const express = require('express');
const { readAlbum, readAlbumById, updateAlbumById, deleteAlbum } = require('../controllers/album');

const albumRouter = express.Router();

albumRouter.get('/', readAlbum);
albumRouter.route('/:id')
.get(readAlbumById)
.patch(updateAlbumById)
.delete(deleteAlbum);


module.exports = albumRouter;