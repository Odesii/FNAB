const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('..config/connection.js');
const bcrypt = require('bcrypt');

class User extends Model {
    // Instance method to verify password
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

User.init({
    // Define attributes
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [8],  // Minimum length of password is 8 characters
        },
    },
}, {
    sequelize,
    timestamps: true,
    modelName: 'user',
    hooks: {
        // Before saving, hash the password
        beforeBulkCreate: async (user) => {

user.password = await bcrypt.hash(user.password, 10);
            return user;
        },
        beforeCreate: async (user) => {
            user.password = await bcrypt.hash(user.password, 10);
            return user;
        },
        beforeUpdate: async (user) => {
            if (user.changed('password')) {
                user.password = await bcrypt.hash(user.password, 10);
            }
            return user;
        },
    }
});

module.exports = User;
