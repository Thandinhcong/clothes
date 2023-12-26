import Size from "../../models/size";
import { SizeSchema } from "../../schema/size";

export const listAllSize = async (req, res) => {
    try {
        const listSizes = await Size.find().sort({ createdAt: -1 });
        if (listSizes.length === 0) {
            return res.status(400).json({
                status: false,
                message: "Không có kích cỡ nào!"
            })
        }
        return res.status(200).json({
            status: true,
            message: "Lấy tất cả kích cỡ thành công",
            data: listSizes,
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error
        })
    }
}
export const listOneSize = async (req, res) => {
    try {
        const id = req.params.id;
        const listSize = await Size.findById(id);
        return res.status(200).json({
            status: true,
            message: "Lấy thong tin thành công",
            data: listSize,
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error
        })
    }
}
export const createSize = async (req, res) => {
    try {
        const body = req.body;
        const { size_name } = body;
        const { error } = SizeSchema.validate(body, { abortEarly: false });
        if (error) {
            const errors = error.details.map(err => err.message);
            return res.status(400).json({
                status: false,
                message: errors
            })
        }
        const isSetName = await Size.findOne({ size_name });
        if (isSetName) {
            return res.status(400).json({
                status: false,
                message: "Tên kích cỡ đã tồn tại",
            })
        }
        const size = await Size.create(body);
        return res.status(201).json({
            status: true,
            message: "Thêm kích cỡ thành công",
            data: size
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error
        })
    }
}

export const removeSize = async (req, res) => {
    try {
        const id = req.params.id;
        const deleteSize = await Size.findByIdAndDelete(id);
        return res.status(200).json({
            status: true,
            message: "Xóa thành công kích cỡ!",
            data: deleteSize
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error
        })
    }
}

export const updateSize = async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;
        const { size_name } = body;
        const { error } = SizeSchema.validate(body, { abortEarly: false });
        if (error) {
            const errors = error.details.map(err => err.message);
            return res.status(400).json({
                status: false,
                message: errors
            })
        }
        const isSetName = await Size.findOne({ size_name, _id: { $ne: id } });
        if (isSetName) {
            return res.status(400).json({
                status: false,
                message: "Tên kích cỡ đã tồn tại",
            });
        };
        const data = await Size.findByIdAndUpdate(id, body, { new: true });
        return res.status(200).json({
            status: true,
            message: "Cập nhật thành công",
            data: data
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error
        })
    }
}