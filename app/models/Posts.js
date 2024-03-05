import { Mongoose } from 'mongoose';
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    uid: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    department: {
        type: String
    },
    designation: {
        type: String
    },
    name: {
        type: String
    },
    profileUrl: {
        type: String
    }
});

export default mongoose.models.User || mongoose.model("User", postSchema); 

