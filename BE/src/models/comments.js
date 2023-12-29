import mongoose from "mongoose";
import { format } from "date-fns";

const CommentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "Auth",
        require: true
    },
    productId: {
        type: mongoose.Types.ObjectId,
        ref: "Product",
        require: true,
    },
    description: {
        type: String,
        require: true
    },
    rating: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

CommentSchema.virtual("formattedCreatedAt").get(function () {
    return format(this.createdAt, "HH:mm a dd/MM/yyyy");
});
export default mongoose.model("Comment", CommentSchema);