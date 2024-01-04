import Cart from "../../models/cart";
import Auth from "../../models/auths"
import ChildProduct from "../../models/childProduct";
import { cartSchema } from "../../schema/cart";



export const resetCart = async (idUser) => {
    try {
        const cartExist = await Cart.findOne({ userId: idUser })
        const productsUpdated = []
        cartExist.products = productsUpdated
        const cartUpdated = await Cart.findOneAndUpdate({ _id: cartExist._id }, cartExist, { new: true })
        return cartUpdated
    } catch (error) {
        console.log(error.message)
        return {}
    }
}

const addProduct = async (cartExist, productAdd, res) => {
    try {
        const productExits = cartExist.products.find((product) =>
            product.productId === productAdd.productId &&
            product.sizeId === productAdd.sizeId &&
            product.colorId === productAdd.colorId
        )
        if (productExits) {
            productExits.stock_quantity += productAdd.stock_quantity;
            cartExist.total += productAdd.stock_quantity * productAdd.product_price;
        } else {
            const newProduct = {
                productId: productAdd.productId,
                product_name: productAdd.product_name,
                product_price: productAdd.product_price,
                product_image: productAdd.product_image,
                stock_quantity: productAdd.stock_quantity,
                sizeId: productAdd.sizeId,
                colorId: productAdd.colorId
            }
            cartExist.products.push(newProduct);
            cartExist.total += productAdd.stock_quantity * newProduct.product_price;
        }
        const cartUpdated = await Cart.findOneAndUpdate({ _id: cartExist._id }, cartExist, { new: true })
        return res.status(200).json({
            message: 'Thêm vào giỏ hàng thành công',
            data: cartUpdated
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Cố lỗi xảy ra"
        })
    }
}

export const create = async (req, res) => {
    try {
        const userId = req.params.id;
        const productNeedToAdd = req.body;
        const userExits = await Auth.findById(userId);
        const product = await ChildProduct.findOne({
            productId: productNeedToAdd.productId,
            colorId: productNeedToAdd.colorId,
            sizeId: productNeedToAdd.sizeId,
        })
        if (!userExits) {
            return res.status(404).json({
                status: false,
                message: "Người dùng không tồn tại",
            })
        };
        const { error } = cartSchema.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(400).json({
                message: errors
            })
        }
        const cartExist = await Cart.findOne({ userId: userId });

        console.log("cartExist", cartExist);
        if (cartExist) {
            return addProduct(cartExist, productNeedToAdd, res)
        }
        const newCart = await Cart.create({
            userId,
            products: [
                {
                    productId: productNeedToAdd._id,
                    ...productNeedToAdd
                }
            ],
            total: productNeedToAdd.product_price * productNeedToAdd.stock_quantity,
        });
        if (!newCart) {
            return res.status(400).json({
                message: 'Thêm vào giỏ hàng thất bại'
            })
        }
        return res.status(200).json({
            message: 'Thêm vào giỏ hàng thành công',
            data: newCart
        })
    } catch (error) {
        console.log("error", error.message);
        return res.status(500).json({
            status: false,
            message: "Cố lỗi xảy ra"
        })
    }
}

export const getOne = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.id })
        if (!cart) {
            return res.status(404).json({
                message: 'Không tìm thấy giỏ hàng',
                data: []
            })
        }
        return res.status(200).json({
            message: 'Lấy giỏ hàng thành công',
            data: cart
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}
export const changeQuantity = async (req, res) => {
    try {
        const idUser = req.params.id;
        const { productId, sizeId, colorId } = req.query;
        const { stock_quantity } = req.body;
        const userExist = await findOne({ _id: idUser });
        if (!userExist) {
            return res.status(404).json({
                message: 'Vui lòng đăng nhập!'
            });
        }
        const cart = await Cart.findOne({ userId: idUser });

        const productExt = cart.products.find((product) =>
            product.productId === productId &&
            product.sizeId === sizeId &&
            product.colorId === colorId
        );
        if (productExt) {
            productExt.stock_quantity = stock_quantity;

            // Cập nhật danh sách sản phẩm trong giỏ hàng
            const productsUpdated = cart.products.map((product) => ({
                productId: product.productId,
                product_name: product.product_name,
                product_price: product.product_price,
                image: product.image,
                stock_quantity: product.stock_quantity,
                sizeId: product.sizeId,
                colorId: product.colorId,
                _id: product._id
            }));
            // Tính lại tổng giá
            const totalUpdated = productsUpdated.reduce((total, product) => {
                return (total += product.stock_quantity * product.product_price);
            }, 0);

            // Cập nhật giỏ hàng và lưu vào cơ sở dữ liệu
            const cartUpdated = await Cart.findOneAndUpdate(
                { userId: idUser },
                { $set: { products: productsUpdated, total: totalUpdated } },
                { new: true }
            );

            return res.status(200).json({
                message: 'Thay đổi sản phẩm thành công',
                data: cartUpdated
            });
        }
        return res.status(400).json({
            message: 'Sản phẩm không tồn tại!',
            data: {}
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

export const removeProduct = async (req, res) => {
    try {
        const idUser = req.params.id
        const { idProduct = '', colorId = '', sizeId = '' } = req.query;
        const userExist = await Auth.findOne({ _id: idUser })
        if (!userExist) {
            return res.status(404).json({
                message: 'Vui lòng đăng nhập!'
            })
        }
        const cart = await Cart.findOne({ userId: idUser })
        const productsUpdated = cart.products.filter((product) =>
            product.productId !== idProduct ||
            product.colorId !== colorId ||
            product.sizeId !== sizeId
        );
        const totalUpdated = productsUpdated.reduce((total, product) => {
            return (total += product.stock_quantity * product.product_price)
        }, 0)
        const cartUpdated = await Cart.findOneAndUpdate(
            { userId: idUser },
            { $set: { products: productsUpdated, total: totalUpdated } },
            { new: true }
        )
        return res.status(200).json({
            message: 'Xóa sản phẩm thành công',
            data: cartUpdated
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

export const clearUserCart = async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.params.id);
        const cartExist = await Cart.findOne({ userId });

        if (!cartExist) {
            return res.status(404).json({ message: 'Không tìm thấy giỏ hàng cho người dùng này' });
        }

        cartExist.products = []; // Xoá tất cả sản phẩm trong giỏ hàng
        cartExist.total = 0;// Đặt tổng giá trị về 0
        // cartExist.couponId = null
        const cartUpdated = await Cart.findOneAndUpdate({ _id: cartExist._id }, cartExist, { new: true });

        return res.status(200).json({
            message: 'Xoá tất cả sản phẩm trong giỏ hàng thành công',
            data: cartUpdated,
        });
    } catch (error) {
        console.error(error); // In ra thông tin lỗi cụ thể
        return res.status(500).json({ message: 'Xoá tất cả sản phẩm trong giỏ hàng không thành công' });
    }
};