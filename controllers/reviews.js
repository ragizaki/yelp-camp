const Review = require('../models/review');
const Campground = require('../models/campground');

const createReview = async (req, res, next) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    // this adds the review to the reviews array referenced in Campground
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash('success', 'Created your review!');
    res.redirect(`/campgrounds/${campground._id}`);
};

const deleteReview = async (req, res, next) => {
    const { id, reviewId } = req.params;
    // using $pull functionality, we can select a single review and delete
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully deleted your review!');
    res.redirect(`/campgrounds/${id}`);
};

module.exports = {
    createReview,
    deleteReview,
};
