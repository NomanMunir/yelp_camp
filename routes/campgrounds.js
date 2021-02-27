const express = require('express');
const router = express.Router();

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
    .post(isLogedIn, validateCampground, CatchAsync(createCampground));

router.get('/new', isLogedIn, renderFrom)

router.get('/:id/edit', isLogedIn, isAuthor, CatchAsync(renderUpdateForm))

router.route('/:id')
    .get(CatchAsync(renderCampground))
    .put(validateCampground, isLogedIn, isAuthor, CatchAsync(updateCampground))
    .delete(isLogedIn, isAuthor, CatchAsync(deleteCampground))

module.exports = router;
