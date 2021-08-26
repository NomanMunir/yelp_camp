const mongoose = require('mongoose');
const Review = require('./review');
const { Schema } = require('mongoose');
const opts = { toJSON: { virtuals: true } }

const imageSchema = new Schema({
    url: String,
    filename: String
})
imageSchema.virtual('thumbnail',).get(function () {
    return this.url.replace("/upload", "/upload/w_200")
})
const campgroundSchema = new Schema({
    title: { type: String, min: 3 },
    images: [imageSchema],
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    price: { type: Number, min: 0 },
    location: { type: String, min: 3 },
    description: { type: String },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        }
    ]
}, opts)
campgroundSchema.virtual('properties.popUpMarkup').get(function () {
    return `
    <strong><a href="/campgrounds/${this._id}">${this.title}</a></strong>
    <p>${this.description.substring(0, 70)}...</p>
    `
})

campgroundSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})
module.exports = mongoose.model('campground', campgroundSchema);


