import mongoose from "mongoose";

const childProductSchema = mongoose.Schema({
    productId: {
        type: mongoose.Types.ObjectId,
        ref: "Product",
        required: true
    },
    product_price: {
        type: Number,
        required: true
    },
    stock_quantity: {
        type: Number,
        required: true
    },
    colorId: {
        type: mongoose.Types.ObjectId,
        ref: "Color",
    },
    sizeId: {
        type: mongoose.Types.ObjectId,
        ref: "Size",
    }
}, { timestamps: true, versionKey: false });

export default mongoose.model("ChildProduct", childProductSchema);