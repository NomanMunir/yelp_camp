const ExpressError = require('../utils/ExpressError');
const Review = require('../models/review');
const Campground = require('../models/campground');

module.exports.createReview = async (req, res, next) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    campground.reviews.push(review)
    await review.save();
    await campground.save();
    req.flash('success', 'Review created!');
    res.redirect(`/campgrounds/${id}`);
}

module.exports.deleteReview = async (req, res, next) => {
    const { reviewId, id } = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Review deleted!')
    res.redirect(`/campgrounds/${id}`);
}