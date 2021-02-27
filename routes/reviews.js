const express = require('express');
const router = express.Router({ mergeParams: true });
const CatchAsync = require('../utils/CatchAsync');

const { validateReview } = require('../middlewares');
const { createReview, deleteReview } = require('../controllers/reviews');

// Routes
router.post('/', validateReview, CatchAsync(createReview))

router.delete('/:reviewId', CatchAsync(deleteReview))

module.exports = router;