const mongoose = require('mongoose')

const artistSchema = new mongoose.Schema({
    first_name : {
        type: String,
        required: true,
    },
    last_name : {
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
})

const Artist = mongoose.model('Artist', artistSchema)

module.exports = {
    Artist
}