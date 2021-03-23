// Requiring Campground model
const Campground = require('../models/campground');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapBoxToken });
const { cloudinary } = require('../cloudinary');

const index = async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds });
};

const renderForm = (req, res) => {
    res.render('campgrounds/new');
};

const makeNewCampground = async (req, res, next) => {
    const geoData = await geocoder
        .forwardGeocode({
            query: req.body.campground.location,
            limit: 1,
        })
        .send();
    const campground = new Campground(req.body.campground);
    campground.geometry = geoData.body.features[0].geometry;
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
    // check if there are any images to delete and then delete them
    if (req.body.deleteImages) {
        // deleting the images from cloudinary
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename);
        }
        // removing the images from mongodb database
        await campground.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } });
    }
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
