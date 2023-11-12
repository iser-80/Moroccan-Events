const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true,
    },
    description : {
        type: String,
        required: true,
    },
    date : {
        type: date,
        required: true,
    },
    location : {
        type: String,
        required: true,
    },
    organizater : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization'
    },
    artists : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artist'
    },
})

const Event = mongoose.model('Event', eventSchema)

module.exports = {
    Artist
}