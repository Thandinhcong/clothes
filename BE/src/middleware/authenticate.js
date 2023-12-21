import Auth from "../models/auths";
import jwt, { JwtPayload } from "jsonwebtoken";
export const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader)
            throw new Error("Bạn phải đăng nhập để thực hiện hành động này");

        const token = authHeader && (authHeader.split(" ")[1]);
        const secretKey = process.env.KEY;
        jwt.verify(
            token,
            secretKey,
            async (error, payload) => {
                if (error) {
                    if (error.name === "JsonWebTokenError") {
                        return res.status(400).json({
                            success: false,
                            message: "Token không hợp lệ",
                        });
                    }
                    if (error.name === "TokenExpiredError") {
                        return res.status(400).json({
                            success: false,
                            message: "Token đã hết hạn",
                        });
                    }
                }
                const user = await Auth.findById(payload?.id);
                if (!user) {
                    return res.status(400).json({
                        success: false,
                        message: "Không tìm thấy người dùng",
                    });
                }

                req.user = user;
                next();
            }
        );
    } catch (error) {

    }
}