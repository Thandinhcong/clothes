import joi from "joi";

export const BrandSchema = joi.object({
    brand_name: joi.string().min(3).required("Trường dữ liệu bắt buộc!")
})
