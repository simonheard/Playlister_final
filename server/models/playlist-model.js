const mongoose = require('mongoose')
const Schema = mongoose.Schema
/*
    This is where we specify the format of the data we're going to put into
    the database.
    
    @author McKilla Gorilla
*/
const playlistSchema = new Schema(
    {
        name: { type: String, required: true },
        ownerEmail: { type: String, required: true },
        ownerName: { type: String, requrired: true},
        published: {type: Boolean, default: false},
        upvotes: { type: Number, default: 0},
        downvotes: {type: Number, default: 0},
        listens: {type: Number, default: 0},
        publishedDate: {type: Date, required: false},
        songs: { type: [{
            title: String,
            artist: String,
            youTubeId: String
        }], required: true },
        comments: { type: [{
            auther: String,
            content: String
        }], required: false}
    },
    { timestamps: true },
)

module.exports = mongoose.model('Playlist', playlistSchema)
