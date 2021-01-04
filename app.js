const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const Campground = require('./models/campground');


// Connect to Db
mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once('open', () => { console.log('DataBase connected') });


const app = express();

//Set View Engine
app.engine('ejs', ejsMate);
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Routes
app.get('/campgrounds', async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds });
})

app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new');
})

app.get('/campgrounds/:id/edit', async (req, res) => {
    try {
        const { id } = req.params;
        const campground = await Campground.findById(id);
        res.render('campgrounds/edit', { campground });
    } catch (error) {
        console.log(error)
    }
})


app.get('/campgrounds/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const campground = await Campground.findById(id);
        res.render('campgrounds/show', { campground });
    } catch (error) {
        console.log(error)
    }
})

app.post('/campgrounds', async (req, res) => {
    const newCampground = new Campground({ ...req.body.campground });
    const campground = await newCampground.save();
    res.redirect(`/campgrounds/${campground._id}`)
})

app.put('/campgrounds/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
        res.redirect(`/campgrounds/${campground._id}`)

    } catch (error) {
        console.log(error)
    }
})

app.delete('/campgrounds/:id', async (req, res) => {
    await Campground.findByIdAndDelete(req.params.id);
    res.redirect('/campgrounds')
})

app.listen(3000, () => {
    console.log('App running on port 3000!');
})