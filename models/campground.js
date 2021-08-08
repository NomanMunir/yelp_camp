const mongoose = require('mongoose');
const Review = require('./review');
const { Schema } = require('mongoose');

const campgroundSchema = new Schema({
    title: { type: String, min: 3 },
    images: [
        {
            url: String,
            filename: String
        }

    ],
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


