const express = require('express');
const { readAlbum, readAlbumById } = require('../controllers/album');

const albumRouter = express.Router();

albumRouter.get('/', readAlbum);
albumRouter.get('/:id', readAlbumById);

module.exports = albumRouter;