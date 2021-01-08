const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const Campground = require('./models/campground');
const CatchAsync = require('./utils/CatchAsync');
const ExpressError = require('./utils/ExpressError');



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
const validateCapmground = (req, res, next) => {
}

// Routes
app.get('/campgrounds', CatchAsync(async (req, res, next) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds });
}))

app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new');
})

app.get('/campgrounds/:id/edit', CatchAsync(async (req, res, next) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    res.render('campgrounds/edit', { campground });
}))


app.get('/campgrounds/:id', CatchAsync(async (req, res, next) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    res.render('campgrounds/show', { campground });
}))

app.post('/campgrounds', CatchAsync(async (req, res, next) => {
    const newCampground = new Campground({ ...req.body.campground });
    const campground = await newCampground.save();
    res.redirect(`/campgrounds/${campground._id}`)
}))

app.put('/campgrounds/:id', CatchAsync(async (req, res, next) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
    res.redirect(`/campgrounds/${campground._id}`)
}))

app.delete('/campgrounds/:id', CatchAsync(async (req, res, next) => {
    await Campground.findByIdAndDelete(req.params.id);
    res.redirect('/campgrounds')
}))

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404));
})

app.use((err, req, res, next) => {
    const { statusCode = 500} = err
    if(!err.message) err.message = "Somthing went wrong!!"
    res.status(statusCode).render('error', { err });
})

app.listen(3000, () => {
    console.log('App running on port 3000!');
})

