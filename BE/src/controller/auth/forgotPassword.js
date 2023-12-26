import Auth from "../../models/auths";

export const ForgotPassword = async (req, res) => {
    try {
        const email = req.body.email;
        //kiểm tra email
        const exitsUser = await Auth.findOne({ email: email });
        if (!exitsUser) {
            return res.status(400).json({
                status: false,
                messgae: "Email không tồn tại",
            })
        }

    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Có lỗi xảy ra khi cập nhật!",
        });
    }
}