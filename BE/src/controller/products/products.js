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