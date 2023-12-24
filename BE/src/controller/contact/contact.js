import Contact from "../../models/contact"

export const getAllContact = async (req, res) => {
    try {
        const contact = await Contact.find();
        if (!contact) {
            return res.status(404).json({
                status: false,
                message: "Không có liên hệ nào!"
            })
        }
        return res.status(200).json({
            status: true,
            message: "Danh sách đã liên hệ:",
            data: contact
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Có lỗi xảy ra!"
        })
    }
}
export const getOneContact = async (req, res) => {
    try {
        const contact = Contact.findOne({})
    } catch (error) {

    }
}