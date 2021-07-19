const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');

//List Albums
router.get('/', asyncHandler(async (req, res) => {
    const albums = await db.Album.findAll();

    return res.json({albums})
}));

module.exports = router;