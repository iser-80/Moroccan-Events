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
        type: Date,
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
    artists: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Artist'
        }],
        default: [],
    },
})

const Event = mongoose.model('Event', eventSchema)

module.exports = {
    Event
}