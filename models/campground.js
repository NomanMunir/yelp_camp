const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const campgroundSchema = new Schema({
    title: { type: String, required: true, min: 3 },
    image: { type: String, required: true, min: 3 },
    price: { type: Number, required: true, min: 0 },
    location: { type: String, required: true, min: 3 },
    description: { type: String, required: true },
})
module.exports = mongoose.model('Campground', campgroundSchema);


