import Brand from "../../models/Brand";
import { BrandSchema } from "../../schema/brand";

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
        return res.status(200).json({
            status: true,
            message: "Lấy 1 thương hiệu thành công!",
            data: listOne
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
            return res.status(404).json({
                message: 'Không thể thêm thương hiệu',
            });

        }
        return res.status(200).json({
            message: 'Thêm thương hiệu thành công',
            brand,
        });
    } catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
};

const removeBrandForce = async (req, res) => {
    try {

    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
}