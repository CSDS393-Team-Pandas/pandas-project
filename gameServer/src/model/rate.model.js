const mongoose = require('mongoose');

const RateSchema = new mongoose.Schema({
    userId: {
        type: String,
        default: ''
    },
    gameId: {
        type: String,
        default: ''
    },
    rate: {
        type: Number,
        default: 0
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
},{
    timestamps: true
})

module.exports = mongoose.model("Rate",RateSchema)