const { date } = require("joi");
const { mongo } = require("mongoose");

const mongoose = require('mongoose');
const { Schema } = require('mongoose');

mongoose.connect('mongodb://localhost:27017/tweet', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => console.log("DB connected!")).catch(e => console.log(e))

const userSchema = new Schema({
    username: String,
    birthday: Date,
})

const tweetSchema = new Schema({
    text: String,
    user: { type: Schema.Types.ObjectId, ref: 'User' }
})

const User = mongoose.model("User", userSchema);
const Tweet = mongoose.model("Tweet", tweetSchema);

const makeTweets = async () => {
    const user = new User({
        username: "Noman Munir",
        birthday: Date.now()
    })

    const tweet = new Tweet({
        text: "I could not sleep tonight",
        user: user
    })
    await user.save()
    await tweet.save()
}
async function findTweet() {
    const t = await Tweet.find({}).populate('user', 'username')
    console.log(t);
}
findTweet()
makeTweets()