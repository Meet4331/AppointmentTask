const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        require: true
    },
    role:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'role',
        required: true
    }
},
    { timestamps: true }
);

const User = mongoose.model('user', userSchema);
module.exports = User;