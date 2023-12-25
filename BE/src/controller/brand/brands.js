import Brand from "../../models/Brand";
import { BrandSchema } from "../../schema/brand";
import Product from "../../models/products";
export const listAllBrand = async (req, res) => {
    try {
        const brand = await Brand.find();
        if (!brand) {
            return res.status(404).json({
                status: false,
                message: "Không có thương hiệu nào!",
            })
        }
        return res.status(200).json({
            status: true,
            message: "Lất tất cả thương hiệu thành công!",
            data: brand,
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }

}
export const listOneBrand = async (req, res) => {
    try {
        const listOne = await Brand.findOne({ _id: req.params.id })
        if (!listOne) {
            return res.status(404).json({
                status: false,
                message: "Không có thương hiệu nào!"
            })
        }
        const product = await Product.find({ brandId: req.params.id });

        return res.status(200).json({
            status: true,
            message: "Lấy 1 thương hiệu thành công!",
            ...listOne.toObject(), product
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
}

export const createBrand = async (req, res) => {
    try {
        const { brand_name } = req.body;
        const body = req.body;
        const data = await Brand.findOne({ brand_name });
        if (data) {
            return res.status(400).json({
                message: "Thương hiệu đã tồn tại",
            });
        }
        const { error } = BrandSchema.validate(body, { abortEarly: false });
        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(400).json({
                message: errors
            })
        }
        const brand = await Brand.create(body);
        if (!brand) {
            return res.status(400).json({
                message: 'Không thể thêm thương hiệu',
            });

        }
        return res.status(201).json({
            status: true,
            message: 'Thêm thương hiệu thành công',
            data: brand,
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error,
        });
    }
};

export const updateBrand = async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;
        const { brand_name } = body;
        const data = await Brand.findOne({ brand_name, _id: { $ne: id } });
        if (data) {
            return res.status(400).json({
                status: false,
                message: "Thương hiệu đã tồn tại"
            })
        }
        const { error } = BrandSchema.validate(body, { abortEarly: false });
        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(400).json({
                message: errors
            })
        }
        const brand = await Brand.findByIdAndUpdate({ _id: req.params.id }, body, { new: true });
        if (!brand) {
            return res.status(400).json({
                status: false,
                message: "Cập nhật thất bại!",
            })
        }
        return res.status(200).json({
            message: "Cập nhật thành công!",
            data: brand,
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error,
        });
    }
}
export const removeBrand = async (req, res) => {
    try {
        const id = req.params.id;
        const deleteBrand = await Brand.findByIdAndDelete(id);
        return res.status(200).json({
            status: true,
            message: "Xóa thương hiệu thành công",
            data: deleteBrand,
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error,
        });
    }
}