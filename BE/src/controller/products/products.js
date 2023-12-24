import Product from "../../models/products";

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