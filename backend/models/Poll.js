const mongoose = require('mongoose');

const pollOptionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        trim: true,
    },
    votes: {
        type: Number,
        default: 0,
    },
});

const pollSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, 'Poll question is required'],
        trim: true,
    },
    options: {
        type: [pollOptionSchema],
        validate: {
            validator: function (options) {
                return options.length >= 2 && options.length <= 6;
            },
            message: 'Poll must have between 2 and 6 options',
        },
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    votedUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    isActive: {
        type: Boolean,
        default: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Poll', pollSchema);
