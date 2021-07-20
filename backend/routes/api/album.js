const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');
const db = require("../../db/models/");
const { requireAuth } = require('../../utils/auth');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

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

//Create New Album
// router.get('/new', asyncHandler(async (req, res) => {
//     return res;
// }))
router.post('/new', requireAuth, asyncHandler(async (req, res, next) => {
    const { name } = req.body;

    const album = await db.Album.build({
        name,
        userId: req.locals.session.user.id
    })

    await album.save();
}))

//Delete Album

router.delete('/:id(\\d+)', requireAuth, asyncHandler(async (req, res) => {
    
}))

module.exports = router;