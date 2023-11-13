const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    events: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
    }],
}, {
    // Move the default property inside the schema options
    timestamps: true,
});

const Organization = mongoose.model('Organization', organizationSchema);

module.exports = {
    Organization
};
