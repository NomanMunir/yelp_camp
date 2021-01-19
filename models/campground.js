const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const campgroundSchema = new Schema({
    title: { type: String, min: 3 },
    image: { type: String, min: 3 },
    price: { type: Number, min: 0 },
    location: { type: String, min: 3 },
    description: { type: String },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "review",
        }
    ]
})
module.exports = mongoose.model('campground', campgroundSchema);


