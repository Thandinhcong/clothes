import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import mongooseDelete from "mongoose-delete";

const ContactSchema = new mongoose.Schema(
    {
        contact_fullName: {
            type: String,
            maxLength: 55,
            required: true
        },
        contact_phone: {
            type: String,
            maxLength: 10,
            required: true
        },
        contact_email: {
            type: String,
            required: true
        },
        contact_content: {
            type: String,
            maxLength: 5000,
        },
    },
    { timestamps: true, versionKey: false }
);

ContactSchema.plugin(mongoosePaginate);
ContactSchema.plugin(mongooseDelete, { overrideMethods: 'all', deletedAt: true });
export default mongoose.model("Contact", ContactSchema);
