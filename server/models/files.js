const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    email: {
        type: String,
    },
    fileName: {
        type: String,
    },
    original: {
        type: String,
        required: true
    },
    convertedBass: {
        type: String,
        required: true
    },
    convertedVocal: {
        type: String,
        required: true
    },
    convertedDrums: {
        type: String,
        required: true
    },
    convertedOther: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const userModel = mongoose.model("files", fileSchema);
module.exports = userModel;