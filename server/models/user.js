const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
    },
    lastName:{
        type: String,
    },
    email:{
        type: String,
        unique: true,
    },
    password:{
        type: String,
    },
    credits:{
        type: Number,
        default: 3
    },
});

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;