import mongoose from "mongoose";

const authSchmas = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    address: {
        type: String,
    },
    avatar: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    gender: {
        type: String
    },
    role: {
        type: String,
        default: "member",
    }

}, { timestamps: true, versionKey: false })

export default mongoose.model("Auth", authSchmas)