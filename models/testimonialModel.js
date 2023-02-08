const mongoose = require('mongoose');

const testimonialSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: true,
    },
    post: {
        type: String,
        enum: ['CEO', 'CTO', 'HR', 'Lead Designer'],
        required: true,
    },
    description: String,
    active: {
        type: Boolean,
        default: true,
    },
}, {timestamps: true }) 

const testimonialModel = mongoose.model('testimonials', testimonialSchema);

module.exports = testimonialModel;