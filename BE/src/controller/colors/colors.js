import Color from "../../models/colors";
import { colorSchema } from "../../schema/color";


export const getAllColor = async (req, res) => {
    try {
        const color = await Color.find();
        if (color.length === 0) {
            return res.status(404).json({
                status: false,
                message: "Không có màu nào!",
            })
        }
        return res.status(200).json({
            status: true,
            message: "Lấy tất cả màu thành công!",
            data: color,
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message,
        });
    }
}
export const createColor = async (req, res) => {
    try {
        const { color_name } = req.body;
        console.log(req.body);
        const { error } = colorSchema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json({
                message: error.details.map((err) => err.message),
            });
        }
        const isSetColorName = await Color.findOne({ color_name });
        if (isSetColorName) {
            return res.status(400).json({
                status: false,
                message: "Tên màu đã tồn tại",
            });
        }
        const color = await Color.create(req.body);
        if (!color) {
            return res.status(400).json({
                status: false,
                message: 'Thêm màu thất bại',
            });
        }
        return res.status(201).json({
            status: true,
            message: 'Thêm màu thành công',
            data: color,
        });
    } catch (error) {
        console.log("error", error);
        return res.status(500).json({
            status: false,
            message: error.message,
        });
    }
}

export const removeColor = async (req, res) => {
    try {
        const color = await Color.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            message: 'Xóa màu thành công',
            data: color
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message,
        });
    }
}

export const listOneColor = async (req, res) => {
    try {
        const id = req.params.id;
        const color = await Color.findById(id);
        if (color.length === 0) {
            return res.status(400).json({
                message: "Không có màu!",
            })
        }
        return res.status(200).json({
            message: "Lấy 1 màu thành công",
            color
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message,
        });
    }
};

export const updateColor = async (req, res) => {
    try {
        const id = req.params.id;
        const { color_name } = req.body;
        const { error } = colorSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: error.details.map((err) => err.message),
            });
        }
        const data = await Color.findOne({ color_name, _id: { $ne: id } });
        if (data) {
            return res.status(400).json({
                status: false,
                message: "Tên màu đã tồn tại",
            });
        }
        const color = await Color.findByIdAndUpdate(id, req.body, { new: true, });
        if (!color) {
            return res.status(404).json({
                status: false,
                message: 'Cập nhật màu thất bại',
            });
        }
        return res.status(200).json({
            status: true,
            message: "Cập nhật màu thành công",
            data: color
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message,
        });
    }
}