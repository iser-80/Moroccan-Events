const mongoose = require('mongoose')

const organizationSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
    },
    description : {
        type: String,
        required: true,
    },
    events : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    },
    password: {
        type: String,
        required: true,
    }
})

const Organization = mongoose.model('Organization', organizationSchema)

module.exports = {
    Organization
}