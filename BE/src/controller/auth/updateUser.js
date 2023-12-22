import Auth from "../../models/auths";

export const updateUser = async (req, res) => {
    try {
        const idUser = req.user;
        const user = await Auth.findById(idUser);
        if (!user) {
            return res.status(404).json({
                error: true,
                message: "Tài khoản không tồn tại!"
            })
        }
        if (req.body.email) {
            return res.status(400).json({
                error: true,
                message: "Không được phép cập nhật email",
            });
        }
        const updateProfile = await Auth.findByIdAndUpdate(idUser, { ...req.body }, { new: true });
        return res.status(200).json({
            success: true,
            message: "Cập nhật tài khoản thành công",
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Có lỗi xảy ra khi cập nhật!",
        });
    }
}