const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');
const db = require("../../db/models/");
const { requireAuth } = require('../../utils/auth');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

//Error validation
const validateCreatePhoto = [
    check('name')
        .exists({ checkFalsy: true })
        .withMessage('Please enter a valid name' )
        .isLength({ min: 3 })
        .withMessage('Please make the name of your photo at least 3 characters in length'),
    check('imgUrl')
        .exists({ checkFalsy : true })
        .withMessage('Please put in a url'),
    handleValidationErrors
]

//Show A Photo
router.get('/:id(\\d+)', asyncHandler(async (req, res) => {
    const photoId = req.params.id;
    const photos = await db.Photo.findByPk(photoId);
    return res.json({ photos });
}));

//Edit a Photo
router.put('/:id(\\d+)/edit', requireAuth, validateCreatePhoto, asyncHandler(async (req, res) => {
    let photoId = req.params.id;
    const photo = await db.Photo.findByPk(photoId)
    let userId = req.user.id
    const { name, imgUrl } = req.body;

    const updatedphoto = {
        name,
        imgUrl,
        userId
    }

    await photo.update(updatedphoto);

    return res.json({ photo })
}))

//Delete a Photo
router.delete('/:id(\\d+)', requireAuth, asyncHandler(async (req, res) => {
    let photoId = req.params.id;
    const photo = await db.Photo.findByPk(photoId)

    await photo.destroy();
    return res.json();
}))

module.exports = router;