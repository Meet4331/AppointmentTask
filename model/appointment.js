const mongoose = require('mongoose');

const userScheema = new mongoose.Schema({
    doctorName: {
        type: String,
        require: true
    },
    appointmentTime: {
        type: Date,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
},
    { timestamps: true }
);

const Appointment = mongoose.model('appointment', userScheema);
module.exports = Appointment