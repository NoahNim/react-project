const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');
const db = require("../../db/models/");
const { requireAuth } = require('../../utils/auth');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

//Error validation
const validateCreateAlbum = [
    check('name')
        .exists({ checkFalsy: true })
        .isLength({ min: 3 })
        .withMessage('Please make the name of your album at least 3 characters in length'),
    handleValidationErrors
]

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
router.post('/new', requireAuth, validateCreateAlbum, asyncHandler(async (req, res) => {
    let userId = req.user.id
    const { name} = req.body;

    const album = await db.Album.build({
        name,
        userId
    })

    await album.save();

    return res.json({ album })
}))

//Edit Album
router.put('/:id(\\d+)/edit', requireAuth, validateCreateAlbum, asyncHandler(async (req, res) => {
    let albumId = req.params.id;
    const album = await db.Album.findByPk(albumId)
    let userId = req.user.id
    const { name } = req.body;

    const updatedAlbum = {
        name,
        userId
    }

    await album.update(updatedAlbum);

    return res.json({ album })
}))

//Delete Album

router.delete('/:id(\\d+)', requireAuth, asyncHandler(async (req, res) => {
    
}))

module.exports = router;