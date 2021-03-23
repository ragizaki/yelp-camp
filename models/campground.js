const mongoose = require('mongoose');
const { Schema } = mongoose;
const Review = require('./review');

// creating a Schema with all the necessary functionality
const CampgroundSchema = new Schema({
    title: String,
    images: [
        {
            url: String,
            filename: String,
        },
    ],
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