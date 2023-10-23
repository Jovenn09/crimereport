const mongoose = require('mongoose')

const accidentSchema = mongoose.Schema({
    date: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    fatalities: {
        type: String,
        required: true,
    },
    injured: {
        type: String,
        required: true,
    },
    vehicle_type: {
        type: String,
        required: true,
    },
    date_of_report: {
        type: Date,
        default: Date.now,
    },
    action_status: {
        type: String,
        enum: ["InProgress", "Solved", "Resolved", "Closed Case"],
        default: "InProgress",
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Accident Report', accidentSchema)