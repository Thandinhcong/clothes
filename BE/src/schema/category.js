import joi from "joi";

export const schemaCategory = joi.object({
    _id: joi.string(),
    category_name: joi.string().min(3).max(50).required("Trường dữ liệu bắt buộc!"),
    category_description: joi.string().max(255),
    category_image: joi.string(),
    brand_id: joi.string(),
    products: joi.array(),
})