import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productFavoriteSchema = mongoose.Schema(
    {
        productId:
        {
            type: mongoose.Types.ObjectId,
            ref: "Product",
            required: true,
        },

        userId: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true,
        },
        favorite_is_new: {
            type: Boolean,
            default: true,
        },
    },
    { versionKey: false, timestamps: true }
);

productFavoriteSchema.plugin(mongoosePaginate);
export default mongoose.model("Favorite", productFavoriteSchema);
