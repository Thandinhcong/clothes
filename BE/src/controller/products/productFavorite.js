import Auth from "../../models/auths";
import Favorite from "../../models/product-favorite";


export const listAllProductFavorite = async (req, res) => {
    try {
        const userId = req.params.id;
        const favoriteProduct = await Favorite.find({ userId: userId }).populate({
            path: "productId",
            select: "product_name product_price image avatar",

        }).sort({ createdAt: -1 });
        return res.status(200).json({
            status: true,
            message: "Danh sách sản phẩm yêu thích",
            data: favoriteProduct
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error
        })
    }
}
export const getFavoriteProducts = async (req, res) => {
    try {
        const { productId, userId } = req.query;
        const favoriteProduct = await Favorite.findOne({ userId: userId, productId: productId });
        return res.status(200).json({
            status: true,
            message: "Lấy sản phẩm được yêu thích",
            data: favoriteProduct,
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error
        })
    }
}

export const createFavoriteProduct = async (req, res) => {
    try {
        const userId = req.params.id;
        const { productId } = req.body;
        const exitUser = await Auth.findById(userId);
        if (!exitUser) {
            return res.status(404).json({
                message: "Người dùng không tồn tại !",
            });
        }
        const existingFavoriteProduct = await Favorite.findOne({
            userId,
            productId,
        });
        if (existingFavoriteProduct) {
            return res.status(400).json({
                message: "Sản phẩm đã được thêm vào mục yêu thích trước đó.",
            });
        }
        const newFavoriteProduct = await Favorite.create({
            userId,
            productId,
        });
        await newFavoriteProduct.save();

        return res.status(201).json({
            message: "Sản phẩm đã được thêm vào mục yêu thích.",
            favoriteProduct: newFavoriteProduct,
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error
        })
    }
}

export const removeFavoriteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const findFavoriteProductById = await Favorite.findById(id);

        if (!findFavoriteProductById) {
            return res.status(404).json({
                message: "Không tìm sản phẩm ",
            });
        }
        const data = await Favorite.findByIdAndDelete(id);
        return res.status(200).json({
            message: "Bỏ sản phẩm yêu thích thành công",
            data,
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
