import joi from "joi";

export const schemaSignup = joi.object({
  name: joi.string().required("Trường dữ liệu bắt buộc!"),
  email: joi.string().email().required("Trường dữ liệu bắt buộc!"),
  password: joi.string().min(8).required("Trường dữ liệu bắt buộc!"),
  conFirmPassword: joi.valid(joi.ref("password"), "Mật khẩu không trùng khớp")
});


export const schemaSignin = joi.object({
  email: joi.string().required("Trường dữ liệu bắt buộc!"),
  password: joi.string().required("Trường dữ liệu bắt buộc!")
})