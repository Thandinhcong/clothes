import Category from "../../models/Category";
import { schemaCategory } from "../../schema/category";


export const listAllCategory = async (req, res) => {
    try {
        const caterory = await Category.find();
        if (!caterory) {
            return res.status(404).json({
                status: false,
                message: "Không có danh mục nào!"
            })
        }
        return res.status(200).json({
            status: true,
            message: "Danh sách danh mục!",
            data: caterory
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Có lỗi xảy ra!"
        })
    }
}

export const listAllDelete = async (req, res) => {
    try {
        const deletedCategories = await Category.findWithDeleted({ deleted: true });
        return res.status(200).json({
            message: "Lấy tất cả danh mục đã bị xóa mềm",
            data: deletedCategories
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};


export const addCategory = async (req, res) => {
    try {
        const { category_name } = req.body;
        const formData = req.body;
        const data = await Category.findOne({ category_name });
        if (data) {
            return res.status(400).json({
                message: "Danh mục đã tồn tại",
            });
        }
        const { error } = schemaCategory.validate(formData, { abortEarly: false });
        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(400).json({
                message: errors,
            });
        }
        const category = await Category.create(formData);
        if (!category || category.length === 0) {
            return res.status(404).json({
                message: "Không tìm thấy danh mục",
            });
        }
        return res.status(200).json({
            message: "Thêm danh mục thành công",
            data: category,
        });
    } catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
};

export const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category || category.length === 0) {
            return res.status(404).json({
                message: "Không tìm thấy danh mục",
            });
        }
        return res.status(200).json({
            message: "Lấy 1 danh mục thành công",
            category,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};
// xóa mềm

export const removeCategory = async (req, res) => {
    try {
        const id = req.params.id;
        const category = await Category.findById(id.trim());

        if (category) {
            await category.delete();
            return res.status(200).json({
                message: "Xoá Danh mục thành công!",
                data: category
            });
        } else {
            return res.status(404).json({
                message: "Không tìm thấy danh mục để xoá.",
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};


export const removeForce = async (req, res) => {
    try {
        const category = await Category.deleteOne({ _id: req.params.id });
        return res.status(200).json({
            message: "Xoá danh mục vĩnh viễn",
            category
        })
    } catch (error) {
        return res.status(500).json({
            message: error,
        })
    }
};

// khôi phục
export const restoreCategory = async (req, res) => {
    try {
        const restoredCategory = await Category.restore({ _id: req.params.id }, { new: true });
        if (!restoredCategory) {
            return res.status(400).json({
                message: "Danh mục không tồn tại hoặc đã được khôi phục trước đó.",
            });
        }

        return res.status(200).json({
            message: "Khôi phục danh mục thành công.",
            category: restoredCategory,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};
export const updateCategory = async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;
        const { category_name } = body;
        const data = await Category.findOne({ category_name, _id: { $ne: id } });
        if (data) {
            return res.status(400).json({
                status: false,
                message: "Danh mục đã tồn tại!"
            })
        }
        const { error } = schemaCategory.validate(body, { abortEarly: false });
        if (error) {
            const errors = error.details.map(err => err.message);
            return res.status(400).json({
                status: false,
                message: errors
            })
        }
        const category = await Category.findOneAndUpdate({ _id: id }, body, { new: true });
        if (!category && category.length === 0) {
            return res.status(400).json({
                status: false,
                message: "Cập nhật thất bại!"
            })
        }
        return res.status(200).json({
            status: false,
            message: "Cập nhật thành công!",
            category
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}