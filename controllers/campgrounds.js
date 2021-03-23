// Requiring Campground model
const Campground = require('../models/campground');

const index = async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds });
};

const renderForm = (req, res) => {
    res.render('campgrounds/new');
};

const makeNewCampground = async (req, res, next) => {
    const campground = new Campground(req.body.campground);
    campground.images = req.files.map(file => ({ url: file.path, filename: file.filename }));
    campground.author = req.user._id;
    await campground.save();
    console.log(campground);
    req.flash('success', 'Successfully made a new campground');
    res.redirect(`/campgrounds/${campground._id}`);
};

const showCampground = async (req, res, next) => {
    const { id } = req.params;
    try {
        const campground = await Campground.findById(id)
            .populate({
                path: 'reviews',
                populate: {
                    path: 'author',
                },
            })
            .populate('author');
        console.log(campground);
        res.render('campgrounds/show', { campground });
    } catch (e) {
        req.flash('error', 'Cannot find that campground');
        return res.redirect('/campgrounds');
    }
};

const renderEditForm = async (req, res, next) => {
    const { id } = req.params;
    try {
        const campground = await Campground.findById(id);
        res.render('campgrounds/edit', { campground });
    } catch (e) {
        req.flash('error', 'Cannot find that campground');
        return res.redirect('/campgrounds');
    }
};

const editCampground = async (req, res, next) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
    const images = req.files.map(f => ({ url: f.path, filename: f.filename }));
    campground.images.push(...images);
    await campground.save();
    req.flash('success', 'Successfully updated campground!');
    res.redirect(`/campgrounds/${campground._id}`);
};

const deleteCampground = async (req, res, next) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted your campground!');
    res.redirect('/campgrounds');
};

module.exports = {
    index,
    renderForm,
    makeNewCampground,
    showCampground,
    renderEditForm,
    editCampground,
    deleteCampground,
};
