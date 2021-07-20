const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');
const db = require("../../db/models/");

//List Albums
router.get('/', asyncHandler(async (req, res) => {
    const albums = await db.Album.findAll();
    
    return res.json({ albums });
}));

//Show An Album
router.get('/:id(\\d+)', asyncHandler(async (req, res) => {
    const albumId = req.params.id;
    const album = await db.Album.findByPk(albumId, {
        include: db.User
    });
    const photos = await db.Photo.findAll();
    return res.json({ album, photos });
}))


module.exports = router;