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

export const changePasswordUserSchema = joi.object({
  currentPassword: joi.string().min(6).required().messages({
    "string.empty": "Mật khẩu hiện tại không được để trống",
    "any.required": "Trường mật khẩu hiện tại là bắt buộc",
    "string.min": "Mật khẩu hiện tại phải có ít nhất {#limit} ký tự",
  }),
  newPassword: joi.string().min(6).required().messages({
    "string.empty": "Mật khẩu mới không được để trống",
    "any.required": "Trường mật khẩu mới là bắt buộc",
    "string.min": "Mật khẩu mới phải có ít nhất {#limit} ký tự",
  })
})