const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
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
            author: '60349d8af49f0e2fd4f6aa6d',
            title: `${sample(descriptors)} ${sample(places)}`,
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            image: 'https://images.pexels.com/photos/338936/pexels-photo-338936.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia beatae ipsa obcaecati a ad asperiores in laboriosam dolorem unde at, velit error nihil accusantium maxime! Illum asperiores nemo accusamus similique.',
            price: randomPrice,
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})