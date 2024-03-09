const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');
//'mongodb://localhost:27017/yelp-camp'
mongoose.connect('mongodb+srv://nomi:Luffy@123@webdeveloper.bcxev.mongodb.net/yelpCamp?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const randomPrice = Math.floor(Math.random() * 10) + 10;
        const camp = new Campground({
            author: "610626a1cf31f81f184b4c6a",
            geometry: { type: 'Point', coordinates: [cities[random1000].longitude, cities[random1000].latitude] },
            title: `${sample(descriptors)} ${sample(places)}`,
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            images: [{
                _id: '610626a1cf31f81f184b4c6a',
                url: 'https://res.cloudinary.com/dxvflnz0s/image/upload/v1627965302/Yelp-Camp/m2llmmxpyc205unuxlkg.jpg',
                filename: 'Yelp-Camp/m2llmmxpyc205unuxlkg'
            },
            {
                _id: '6108c776fbe1cc30d46dd157',
                url: 'https://res.cloudinary.com/dxvflnz0s/image/upload/v1627965301/Yelp-Camp/rvraz7uefr3ht4l2y6ck.jpg',
                filename: 'Yelp-Camp/rvraz7uefr3ht4l2y6ck'
            },
            {
                _id: '6108c776fbe1cc30d46dd155',
                url: 'https://res.cloudinary.com/dxvflnz0s/image/upload/v1627965302/Yelp-Camp/qz880ss6vdln9kmkypgh.jpg',
                filename: 'Yelp-Camp/qz880ss6vdln9kmkypgh'
            }],
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia beatae ipsa obcaecati a ad asperiores in laboriosam dolorem unde at, velit error nihil accusantium maxime! Illum asperiores nemo accusamus similique.',
            price: randomPrice,
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})