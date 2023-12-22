import mongoose from 'mongoose';

const SizeSchema = mongoose.Schema({
    size_name: {
        type: String,
        required: true,
    },
    size_price: {
        type: Number,
        required: true
    },
    size_info: {
        type: String,
        default: 'norma'
    },
}, { timestamps: true, versionKey: false });

export default mongoose.model('Size', SizeSchema);