const express = require('express');
const router = express.Router({ mergeParams: true });

const Review = require('../models/review');
const Campground = require('../models/campground');

const { reviewSchema } = require('../Schemas');

const CatchAsync = require('../utils/CatchAsync');
const ExpressError = require('../utils/ExpressError');

// Middleware

const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(",")
        throw new ExpressError(msg, 400)
    } else {
        next()
    }
}

// Routes
router.post('/', validateReview, CatchAsync(async (req, res, next) => {
    const review = new Review(req.body.review);
    const campground = await Campground.findById(req.params.id);
    campground.reviews.push(review)
    await review.save();
    await campground.save();
    req.flash('success', 'Review created!')
    res.redirect(`/campgrounds/${campground._id}`);
}))

router.delete('/:reviewId', CatchAsync(async (req, res, next) => {
    const { reviewId, id } = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Review deleted!')
    res.redirect(`/campgrounds/${id}`);
}))

module.exports = router;