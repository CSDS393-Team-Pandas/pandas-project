const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
    adminId: {
        type: String,
        default: ''
    },
    description: { 
        type: String,
        default: ''
    },
    authorName: {
        type: String,
        default: ''
    },
    name: {
        type: String,
        default: ''
    },
    price: {
        type: String,
        default: ''
    },
    thumb: {
        type: String,
        default: ''
    },
    imgList: {
        type: Array,
        default: []
    },
    type: {
        type: Array,
        default: []
    },
    score: {
        type: Array,
        default: []
    },
    tag: {
        type: String,
        default: ''
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
},{
    timestamps: true
})

module.exports = mongoose.model("Game",GameSchema)