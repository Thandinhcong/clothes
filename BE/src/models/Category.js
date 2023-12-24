import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import mongooseDelete from "mongoose-delete";
const CategorySchema = mongoose.Schema(
    {
        category_name: {
            type: String,
            maxlength: 50,
            require: true,
        },
        category_image: {
            type: Object,
            require: true,
            default: {
                url: "https://i.pinimg.com/736x/e0/7a/22/e07a22eafdb803f1f26bf60de2143f7b.jpg",
                publicId: "nbv0jiu0bitjxlxo1bqi",
            },
        },
        category_description: {
            type: String,
            minlength: 3,
            maxlength: 255,
        },
        products: [
            {
                type: mongoose.Types.ObjectId,
                ref: "Product",
                require: true,
            },
        ],
        brand_id: {
            type: mongoose.Types.ObjectId,
            ref: "Brand",
        }
    },
    { timestamps: true, versionKey: false }
);
CategorySchema.plugin(mongoosePaginate);
CategorySchema.plugin(mongooseDelete, { overrideMethods: 'all', deletedAt: true });
export default mongoose.model("Category", CategorySchema);
