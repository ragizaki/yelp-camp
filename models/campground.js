const mongoose = require('mongoose');
const { Schema } = mongoose;
const Review = require('./review');
const opts = { toJSON: { virtuals: true } };

// creating a Schema with all the necessary functionality

const ImageSchema = new Schema({
    url: String,
    filename: String,
});

ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200');
});

const CampgroundSchema = new Schema(
    {
        title: String,
        images: [ImageSchema],
        geometry: {
            type: {
                type: String,
                enum: ['Point'],
                required: true,
            },
            coordinates: {
                type: [Number],
                required: true,
            },
        },
        price: Number,
        description: String,
        location: String,
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        reviews: [
            {
                // creating a reference to the Review Schema
                type: Schema.Types.ObjectId,
                ref: 'Review',
            },
        ],
    },
    opts
);

CampgroundSchema.virtual('properties.popUpMarkup').get(function () {
    return `<strong><a href="/campgrounds/${this._id}">${this.title}</a></strong>
            <p>${this.description.substring(0, 20)}...</p>`;
});

// Middleware that will delete all reviews associated with a campground
//  if said campground is deleted
CampgroundSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        // if the ID field for a Review was one of the ID's in our document
        //      we will remove it using $in
        await Review.deleteMany({ _id: { $in: doc.reviews } });
    }
});

const Campground = mongoose.model('Campground', CampgroundSchema);
module.exports = Campground;
