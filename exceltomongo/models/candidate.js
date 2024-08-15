const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    mobileNo: { type: Number, required: true },
    dateOfBirth: { type: Number,  },
    workExperience: { type: String,  },
    resumeTitle: { type: String },
    currentLocation: { type: String },
    postalAddress: { type: String},
    currentEmployer: { type: String },
    currentDesignation: { type: String}
});

module.exports = mongoose.model('Candidate', candidateSchema);
