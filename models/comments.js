const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('..config/connection.js');

class Comment extends Model {}

Comment.init({
    content: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'id',
        },
    },
    postId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'posts',
            key: 'id',
        },
    },
}, {
    sequelize,
    timestamps: true,
    modelName: 'comment'
});

module.exports = Comment;
