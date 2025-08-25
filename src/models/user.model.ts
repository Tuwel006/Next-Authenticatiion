import mongoose, { models } from "mongoose";    

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        require: [true, 'User name is required'],
        unique: true,
    },
    email: {
        type: String,
        require: [true, 'Please Provide email'],
        unique: true,
    },
    password: {
        type: String,
        require: [true, 'Please Provide Password'],
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date
})

const User = models.users || mongoose.model('users', userSchema);

export default User;