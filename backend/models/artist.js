const mongoose = require('mongoose')

const artistSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
    },
    genre : {
        type: String,
        required: true,
    },
    events : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artist' 
    },
    password: {
        type: String,
        required: true,
    }
})

const Artist = mongoose.model('Artist', artistSchema)

module.exports = {
    Artist
}