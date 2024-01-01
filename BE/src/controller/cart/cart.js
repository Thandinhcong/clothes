import Cart from "../../models/cart";
import Auth from "../../models/auths"



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

export const addProduct = async (cartExist, productAdd, res) => {
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
        const product = await 
        if (!userExits) {
            return res.status(404).json({
                status: false,
                message: "Người dùng không tồn tại",
            })
        };
        ì()
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Cố lỗi xảy ra"
        })
    }
}