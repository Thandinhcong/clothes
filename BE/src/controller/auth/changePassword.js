import Auth from "../../models/auths";
import bcrypt from "bcryptjs";
import { changePasswordUserSchema } from "../../schema/auths";

export const changePassWord = async (req, res) => {
    try {
        const { error } = changePasswordUserSchema.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(400).json({
                message: errors
            })
        }
        const user = req.user;
        const isMatch = bcrypt.compare(req.body.currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({
                error: true,
                message: "Mật khẩu hiện tại không đúng"
            })
        }
        const hashedNewPassword = await bcrypt.hash(req.body.newPassword, 10);
        const userNew = await Auth.findByIdAndUpdate(req.user._id, { password: hashedNewPassword }, { new: true });
        if (!userNew) {
            return res.status(400).json({
                error: true,
                message: "Không tìm thấy người dùng"
            })
        }
        userNew.passwordChangeAt = Date.now();
        user.role = undefined;
        return res.status(200).json({
            message: "Đổi mật khẩu thành công",
            user,
        })
        // if(isPassword)
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Có lỗi xảy ra!",
        });
    }
}