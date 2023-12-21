import Auth from "../../models/auths";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { schemaSignin, schemaSignup } from "../../schema/auths";


export const Signup = async (req, res) => {
    try {
        const { error } = schemaSignup.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map(err => err.message);
            return res.status(400).json({
                message: errors,
            })
        }
        const exitUser = await Auth.findOne({ email: req.body.email });
        if (exitUser) {
            return res.status(400).json({
                status: false,
                message: "Email đã tồn tại!"
            })
        }
        // mã hóa
        const hashedPassword = await bcrypt.hash(req.body.password, 11);
        // create 
        const user = await Auth.create({
            ...req.body,
            password: hashedPassword
        })
        const token = jwt.sign({ id: user._id }, process.env.KEY, { expiresIn: "1h" });
        user.password = undefined;
        return res.status(201).json({
            status: true,
            message: "Tạo tài khoản thành công!",
            accessToken: token,
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Lỗi khi đăng ký tài khoản!"
        })
    }
}
export const Signin = async (req, res) => {
    try {
        const { error } = schemaSignin.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map(err => err.message);
            return res.status(400).json({
                message: errors,
            })
        }
        const checkEmail = await Auth.findOne({ email: req.body.email });
        if (!checkEmail) {
            return res.status(404).json({
                status: false,
                message: "Email không tồn tại!"
            })
        }
        const isPassword = await bcrypt.compare(req.body.password, checkEmail.password);
        if (!isPassword) {
            return res.status(400).json({
                status: false,
                message: "Mật khẩu không chính xác!"
            })
        }
        const token = jwt.sign({ id: checkEmail._id }, process.env.KEY, { expiresIn: "1h" });
        return res.status(200).json({
            status: true,
            message: "Đăng nhập thành công!",
            acccessToken: token
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Lỗi khi đăng nhập!"
        })
    }
}

export const getInfoUser = async (req, res) => {
    try {
        const listInfo = req.user;
        if (!listInfo) {
            return res.status(404).json({
                message: "Không tìm thấy tài khoản",
            });
        }
        listInfo.password = undefined;
        listInfo.role = undefined;
        return res.status(200).json({
            user: listInfo,
            message: "Lấy dữ liệu người dùng thành công",
            success: true,
        });
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

export const logout = async (req, res) => {
    try {

    } catch (error) {
        return res.status(500).json(error.message);
    }
}