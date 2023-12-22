import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import mongooseDelete from "mongoose-delete";

const schemaProduct = mongoose.Schema({
    product_name: {
        required: true,
        type: String
    },
    product_price: {
        required: true,
        type: Number,
    },
    product_image: {
        required: true,
        type: Array
    },
    views: {
        type: Number,
        default: 0
    },
    description: {
        type: String
    },
    sold_quantity: {
        type: Number,
        default: 0
    },
    categoryId: {
        type: mongoose.Types.ObjectId,
        ref: "Category",
    },
    brandId: {
        type: mongoose.Types.ObjectId,
        ref: "Brand",
    },
    favorite_id: {
        type: mongoose.Types.ObjectId,
        ref: "Favorite",
    },
})

schemaProduct.plugin(mongoosePaginate);
schemaProduct.plugin(mongooseDelete, { overrideMethods: "all", deletedAt: true });
export default mongoose.model("Product", schemaProduct);