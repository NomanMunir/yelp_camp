const Campground = require('../models/campground');

module.exports.index = async (req, res, next) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds });
}

module.exports.createCampground = async (req, res, next) => {
    const newCampground = new Campground({ ...req.body.campground });
    newCampground.author = req.user._id;
    const campground = await newCampground.save();
    req.flash('success', 'Successfully made a campground!');
    res.redirect(`/campgrounds/${campground._id}`);

}

module.exports.renderFrom = (req, res) => {
    res.render('campgrounds/new');
}

module.exports.renderUpdateForm = async (req, res, next) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if (!campground) {
        req.flash('error', 'Cannot find that campground!');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/edit', { campground });
}

module.exports.renderCampground = async (req, res, next) => {
    const { id } = req.params;
    const campground = await Campground.findById(id).populate('reviews').populate('author');
    if (!campground) {
        req.flash('error', 'Cannot find that campground!');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/show', { campground });
}

module.exports.updateCampground = async (req, res, next) => {
    const { id } = req.params;
    campground.updateOne({ ...req.body.campground })
    req.flash('success', 'Successfully updated campground!');
    res.redirect(`/campgrounds/${id}`)
}

module.exports.deleteCampground = async (req, res, next) => {
    const { id } = req.params;
    await Campground.deleteOne(id);
    req.flash('success', 'Successfully deleted campground!');
    res.redirect('/campgrounds');
}