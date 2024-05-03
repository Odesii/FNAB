const express = require('express');
const { Post } = require('../models');
const router = express.Router();

// Get all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.findAll();
        res.json(posts);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Create a new post
router.post('/', async (req, res) => {
    try {
        const newPost = await Post.create({
            title: req.body.title,
            content: req.body.content,
            userId: req.session.userId, // Assumes the user is logged in
        });
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Update a post
router.put('/:id', async (req, res) => {
    try {
        const updatedPost = await Post.update(req.body, {
            where: { id: req.params.id }
        });
        if (updatedPost[0]) {
            res.json({ message: 'Post updated' });
        } else {
            res.status(404).json({ message: 'Post not found' });
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

// Delete a post
router.delete('/:id', async (req, res) => {
    try {
        const result = await Post.destroy({
            where: { id: req.params.id }
        });
        if (result) {
            res.json({ message: 'Post deleted' });
        } else {
            res.status(404).json({ message: 'Post not found' });
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;