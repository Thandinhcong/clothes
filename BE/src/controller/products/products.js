import Category from "../../models/Category";
import Product from "../../models/products";
import { ProductSchema } from "../../schema/product";

export const ListAllProducts = async (req, res) => {
    const { _page = 1, _limit = 20, _sort = "createAt", _order = "asc" } = req.query;
    const options = {
        limit: 20,
        page: _page,
        limit: _limit,
        sort: {
            [_sort]: _order === "desc" ? -1 : 1,
        }
    }
    try {
        const product = await Product.paginate({}, options);
        if (!product) {
            return res.status(404).json({
                status: false,
                message: "Không có sản phẩm nào!"
            })
        }
        return res.status(200).json({
            status: true,
            message: "Danh sách sản phẩm!",
            data: product
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Có lỗi xảy ra!"
        })
    }
}
export const getOneProduct = async (req, res) => {
    try {
        const listOneProduct = await Product.findOne({ _id: req.params.id });
        if (!listOneProduct) {
            return res.status(404).json({
                status: false,
                message: "Không tìm thấy sản phẩm"
            })
        }
        return res.status(200).json({
            status: true,
            message: "Lấy thông tin sản phẩm thành công.",
            data: listOneProduct
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Có lỗi xảy ra!"
        })
    }
}

//xóa mềm
export const removeProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findById(id.trim());

        if (product) {
            await product.delete();
            return res.status(200).json({
                message: "Xoá Sản phẩm thành công!",
                data: product
            });
        } else {
            return res.status(404).json({
                message: "Không tìm thấy sản phẩm để xoá.",
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};
// xóa vĩnh viễn
export const removeForce = async (req, res) => {
    try {
        const product = await Product.deleteOne({ _id: req.params.id });
        return res.status(200).json({
            message: "Xoá sản phẩm vĩnh viễn",
            data: product
        })
    } catch (error) {
        return res.status(500).json({
            message: error,
        })
    }
};

//khôi phục
export const restoreProduct = async (req, res) => {
    try {
        const restoredProduct = await Product.restore({ _id: req.params.id }, { new: true });
        if (!restoredProduct) {
            return res.status(400).json({
                message: "Sản phẩm không tồn tại hoặc đã được khôi phục trước đó.",
            });
        }

        return res.status(200).json({
            message: "Khôi phục sản phẩm thành công.",
            category: restoredProduct,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};


export const listAllDelete = async (req, res) => {
    try {
        const deletedProduct = await Product.findWithDeleted({ deleted: true });
        return res.status(200).json({
            message: "Lấy tất cả sản phẩm đã bị xóa mềm",
            data: deletedProduct
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

export const createProduct = async (req, res) => {
    try {
        const body = req.body;
        const { product_name } = body;
        const data = await Product.findOne({ product_name });
        const { error } = ProductSchema.validate(body, { abortEarly: false });
        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(400).json({
                status: false,
                message: errors
            })
        }
        if (data) {
            return res.status(400).json({
                status: false,
                message: "Tên Sản phẩm đã tồn tại",
            })
        }
        const product = await Product.create(body);
        await Category.findOneAndUpdate(product.categoryId, {
            $addToSet: {
                products: product._id
            }
        })
        if (product.length === 0) {
            return res.status(400).json({
                status: false,
                message: "Thêm sản phẩm thất bại"
            })
        }
        return res.status(201).json({
            status: true,
            message: "Thêm sản phẩm thành công!",
            data: product
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Có lỗi sảy ra khi thêm sản phẩm!"
        })
    }
}

export const updateProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;
        const { categoryId } = req.body;
        const { product_name } = body;
        const product = await Product.findById(id);
        // validate
        const { error } = ProductSchema.validate(body, { abortEarly: false });
        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(400).json({
                status: false,
                message: errors
            })
        }
        //check tên
        const isSetName = await Product.findOne({ product_name, _id: { $ne: id } });
        if (isSetName) {
            return res.status(400).json({
                status: false,
                message: "Tên Sản phẩm đã tồn tại",
            })
        }
        await Category.findByIdAndUpdate(product.categoryId, {
            $pull: {
                products: product._id
            }
        })
        await Category.findByIdAndUpdate(categoryId, {
            $addToSet: {
                products: product._id
            }
        })
        const data = await Product.findByIdAndUpdate({ _id: id }, body, { new: true })
        if (data.length === 0) {
            return res.status(400).json({
                status: false,
                message: "Cập nhật sản phẩm thất bại"
            })
        }
        return res.status(200).json({
            status: true,
            message: "Cập nhật sản phẩm thành công",
            data
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Có lỗi sảy ra khi cập nhật sản phẩm!"
        })
    }
}
export const viewProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ error: 'Sản phẩm không tồn tại.' });
        }

        product.views += 1;
        await product.save();

        res.json({ message: 'Đã xem sản phẩm.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Lỗi trong quá trình xử lý.' });
    }
}