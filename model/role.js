const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    status: {
        type: Number,
        default: true,
        required: true
    }
},
    { timestamps: true }
);

const Role = mongoose.model('role', roleSchema);
module.exports = Role;