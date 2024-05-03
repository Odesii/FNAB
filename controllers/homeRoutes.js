const express = require('express');
const router = express.Router();
const { Post, User } = require('../models');

// GET homepage
router.get('/', async (req, res) => {
    try {
        // Fetch all posts along with the user details
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
            order: [['createdAt', 'DESC']],  // Orders the posts by creation time in descending order
        });

        // Convert the Sequelize data to a plain object
        const posts = postData.map(post => post.get({ plain: true }));

        // Render homepage with posts data
        res.render('homepage', { posts, loggedIn: req.session.loggedIn });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
