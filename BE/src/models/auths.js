import mongoose from "mongoose";
import { format } from "date-fns";

const authSchmas = new mongoose.Schema({
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
        type: Object
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    gender: {
        type: String
    },
    authType: {
        type: String,
        enum: ['local', 'google', 'facebook'],
        default: 'local'
    },
    role: {
        type: String,
        default: "member",
    },
    googleId: {
        type: String,
        default: null,
    },
    facebookId: {
        type: String,
        default: null,
    },
}, { timestamps: true, versionKey: false })
authSchmas.virtual("formattedCreatedAt").get(function () {
    return format(this.createdAt, "HH:mm a dd/MM/yyyy");
});
export default mongoose.model("Auth", authSchmas)