const express = require('express');
const router = express.Router();
const multer = require('multer');
const { storage } = require('../cloudinary');

const upload = multer({ storage });

// Middlewares
const { isLogedIn, validateCampground, isAuthor } = require('../middlewares.js');
const CatchAsync = require('../utils/CatchAsync');

// Controllers
const
    {
        index,
        createCampground,
        renderFrom,
        renderUpdateForm,
        renderCampground,
        updateCampground,
        deleteCampground
    }
        = require('../controllers/campgrounds');


// Routes

router.route('/')
    .get(CatchAsync(index))
    .post(isLogedIn, upload.array('image'), validateCampground, CatchAsync(createCampground));
router.get('/new', isLogedIn, renderFrom)

router.get('/:id/edit', isLogedIn, isAuthor, CatchAsync(renderUpdateForm))

router.route('/:id')
    .get(CatchAsync(renderCampground))
    .put(isLogedIn, isAuthor, upload.array('image'), CatchAsync(updateCampground))
    .delete(isLogedIn, isAuthor, CatchAsync(deleteCampground))

module.exports = router;
