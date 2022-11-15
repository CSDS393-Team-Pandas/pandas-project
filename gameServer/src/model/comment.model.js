const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    userId: {
        type: String,
        default: ''
    },
    gameId: {
        type: String,
        default: ''
    },
    articleId: {
        type: String,
        default: ''
    },
    content: { 
        type: String,
        default: ''
    },
    authorName: {
        type: String,
        default: ''
    },
    authorAvatar: {
        type: String,
        default: ''
    },
    linkCommentId: {
        type: String,
        default: ''
    },
    viewTimes: { 
        type: Number,
        default: 0
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    praise: { 
        type: Number,
        default: 0
    }
},{
    timestamps: true
})

module.exports = mongoose.model("Comments",CommentSchema)