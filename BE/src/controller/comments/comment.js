import Auth from "../../models/auths";
import Comment from "../../models/comments";
import Product from "../../models/products";

export const getCommentFromProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const comments = await Comment.find({ productId: productId }).sort({ createdAt: -1 }).populate({
            path: "userId",
            select: "name email avatar"
        });
        if (!comments || comments.length === 0) {
            return res.status(404).json({
                message: 'Không tìm thấy theo sản phẩm bình luận',
            });
        }
        return res.status(200).json({
            message: 'Lấy bình luận theo sản phẩm thành công',
            data: comments,
        });
    } catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
}

export const getOneComment = async (req, res) => {
    try {
        const { id } = req.params;
        const comment = await Comment.findById(id);
        if (!comment) {
            return res.status(404).json({
                message: 'Không tìm thấy bình luận',
            });
        }
        return res.status(200).json({
            message: "Lấy thành công 1 bình luận",
            data: comment,
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};