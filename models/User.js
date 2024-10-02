const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    name: String,
    googleId: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    firstName: String,
    lastName: String,
    role: {
        type: String,
        enum: ['admin', 'facilityOwner', 'user'],
        default: 'user'
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;






