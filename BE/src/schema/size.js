import Joi from "joi";

export const SizeSchema = Joi.object({
    _id: Joi.string(),
    size_name: Joi.string().required().messages({
        "string.empty": "Tên size không được để trống",
        "any.required": "Trường tên size bắt buộc nhập"
    }),
    size_price: Joi.number().min(1000).max(10000000).required().messages({
        "number.empty": "Giá kích cỡ bắt buộc nhập",
        "any.required": "Trường giá kích cỡ bắt buộc nhập",
        "number.base": "Giá kích cỡ phải là số",
        'number.min': 'Giá ít nhất phải là 1000đ.',
        'number.max': 'Giá cao nhất là 10.000.000đ'
    }),
    size_info: Joi.string()
});