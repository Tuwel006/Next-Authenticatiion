import mongoose, { models } from "mongoose";

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, 'User name is required'],
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'Please Provide email'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please Provide Password'],
    },
    role: {
        type: String,
        enum: ['admin', 'manager', 'user'],
        default: 'user'
    },
    firstName: {
        type: String,
        required: [true, 'First name is required']
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required']
    },
    avatar: {
        type: String,
        default: ''
    },
    department: {
        type: String,
        default: ''
    },
    isActive: {
        type: Boolean,
        default: true
    },
    lastLogin: {
        type: Date,
        default: Date.now
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date
}, {
    timestamps: true
})

const User = models.users || mongoose.model('users', userSchema);

export default User;