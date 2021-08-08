const express = require('express');
const router = express.Router({ mergeParams: true });
const CatchAsync = require('../utils/CatchAsync');

const { validateReview, isReviewAuthor, isLogedIn } = require('../middlewares');
const { createReview, deleteReview } = require('../controllers/reviews');

// Routes
router.post('/', validateReview, isLogedIn, CatchAsync(createReview))

router.delete('/:reviewId', isLogedIn, isReviewAuthor, CatchAsync(deleteReview))

module.exports = router;