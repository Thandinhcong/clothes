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
        // Sử dụng find với điều kiện deletedAt không phải là null
        const deletedCategories = await Category.findWithDeleted({ deleted: true });


        return res.status(200).json({
            message: "Lấy tất cả danh mục đã bị xóa mềm",
            data: deletedCategories
        });
    } catch (error) {
        return res.status(400).json({
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
        return res.status(400).json({
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
        return res.status(400).json({
            message: error.message,
        });
    }
};
// xóa mềm

export const removeCategory = async (req, res) => {
    try {
        const id = req.params.id;
        // Sử dụng phương thức delete() provided by mongoose-delete để xóa mềm
        const category = await Category.findById(id.trim());

        if (category) {
            await category.delete();  // Sử dụng phương thức delete() để xóa mềm
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
        console.log("error", error);
        return res.status(400).json({
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
        return res.status(400).json({
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
        console.log(error);
        return res.status(400).json({
            message: error.message,
        });
    }
};