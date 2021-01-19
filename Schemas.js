const Joi = require('joi');

module.exports.campgroundSchema = Joi.object({
    campground: Joi.object({
        title: Joi.string().required().min(3),
        location: Joi.string().required().min(3),
        image: Joi.string().required(),
        price: Joi.number().required().min(0),
        description: Joi.string().required(),
    }).required()
})

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        body: Joi.string().required(),
        rating: Joi.string().required().min(1).max(5),
    })
})