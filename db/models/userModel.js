import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        trim: true,
    },
    userImage: String,

    userPhone:{
        type:String
    },
    userEmail: {
        type: String,
        required: true
    },

    hash: String,
    salt: String,

}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;