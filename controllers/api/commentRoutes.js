const express = require('express');
const { Comment } = require('../models');
const router = express.Router();

// Create a comment
router.post('/', async (req, res) => {
    try {
        const newComment = await Comment.create({
            content: req.body.content,
            userId: req.session.userId, // Assumes the user is logged in
            postId: req.body.postId,
        });
        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;
