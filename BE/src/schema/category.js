import joi from "joi";

export const schemaCategory = joi.object({
    category_name: joi.string().min(3).max(50).required("Trường dữ liệu bắt buộc!"),
    category_description: joi.string().max(255),
    category_image: joi.object(),
    brand_id: joi.string(),
    products: joi.array(),
})