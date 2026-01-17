const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Poll = require('../models/Poll');
const { auth, adminAuth } = require('../middleware/auth');

// @route   GET /api/polls
// @desc    Get all polls
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const polls = await Poll.find({ isActive: true })
            .sort({ createdAt: -1 })
            .populate('createdBy', 'username');

        res.json(polls);
    } catch (error) {
        console.error('Get polls error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   GET /api/polls/:id
// @desc    Get a single poll
// @access  Private
router.get('/:id', auth, async (req, res) => {
    try {
        const poll = await Poll.findById(req.params.id).populate('createdBy', 'username');

        if (!poll) {
            return res.status(404).json({ message: 'Poll not found' });
        }

        res.json(poll);
    } catch (error) {
        console.error('Get poll error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   POST /api/polls
// @desc    Create a new poll
// @access  Private (Admin only)
router.post(
    '/',
    [
        auth,
        adminAuth,
        body('question').trim().notEmpty().withMessage('Question is required'),
        body('options').isArray({ min: 2, max: 6 }).withMessage('Poll must have between 2 and 6 options'),
        body('options.*').trim().notEmpty().withMessage('All options must have text'),
    ],
    async (req, res) => {
        try {
            // Validate input
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: errors.array()[0].msg });
            }

            const { question, options } = req.body;

            // Create poll options
            const pollOptions = options.map(text => ({ text, votes: 0 }));

            // Create new poll
            const poll = new Poll({
                question,
                options: pollOptions,
                createdBy: req.user._id,
            });

            await poll.save();

            res.status(201).json(poll);
        } catch (error) {
            console.error('Create poll error:', error);
            res.status(500).json({ message: 'Server error' });
        }
    }
);

// @route   POST /api/polls/:id/vote
// @desc    Vote on a poll
// @access  Private
router.post(
    '/:id/vote',
    [
        auth,
        body('optionId').notEmpty().withMessage('Option ID is required'),
    ],
    async (req, res) => {
        try {
            // Validate input
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: errors.array()[0].msg });
            }

            const { optionId } = req.body;
            const poll = await Poll.findById(req.params.id);

            if (!poll) {
                return res.status(404).json({ message: 'Poll not found' });
            }

            // Check if user has already voted
            if (poll.votedUsers.includes(req.user._id)) {
                return res.status(400).json({ message: 'You have already voted on this poll' });
            }

            // Find the option and increment votes
            const option = poll.options.id(optionId);
            if (!option) {
                return res.status(404).json({ message: 'Option not found' });
            }

            option.votes += 1;
            poll.votedUsers.push(req.user._id);

            await poll.save();

            res.json(poll);
        } catch (error) {
            console.error('Vote error:', error);
            res.status(500).json({ message: 'Server error' });
        }
    }
);

// @route   DELETE /api/polls/:id
// @desc    Delete a poll
// @access  Private (Admin only)
router.delete('/:id', [auth, adminAuth], async (req, res) => {
    try {
        const poll = await Poll.findById(req.params.id);

        if (!poll) {
            return res.status(404).json({ message: 'Poll not found' });
        }

        await poll.deleteOne();

        res.json({ message: 'Poll deleted successfully' });
    } catch (error) {
        console.error('Delete poll error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
