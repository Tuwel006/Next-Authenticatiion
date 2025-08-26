import mongoose, { models } from "mongoose";

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Project name is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Project description is required']
    },
    status: {
        type: String,
        enum: ['planning', 'active', 'on-hold', 'completed', 'cancelled'],
        default: 'planning'
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high', 'urgent'],
        default: 'medium'
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    budget: {
        type: Number,
        default: 0
    },
    progress: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },
    manager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    team: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }],
    tags: [String],
    color: {
        type: String,
        default: '#3B82F6'
    }
}, {
    timestamps: true
});

const Project = models.projects || mongoose.model('projects', projectSchema);

export default Project;