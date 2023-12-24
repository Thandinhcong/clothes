import { required } from "joi";
import mongoose from "mongoose";

const cartSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Types.ObjectId,
        ref: "Auth",
        required: true
    },
    products: [{
        product_id: String,
        product_name: String,
        product_price: Number,
        image: String,
        stock_quantity: Number,
        color_id: String,
        size_id: String,
        original_price: Number
    }],
    total: {
        type: Number
    }
},
    { timestamps: true, versionKey: false })
export default mongoose.model("Cart", cartSchema);