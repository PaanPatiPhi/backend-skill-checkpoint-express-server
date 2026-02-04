export const validateCreateAnswer = (req, res, next) => {
  const { content } = req.body;

  // โจทย์ไม่ได้กำหนดรายละเอียด → เช็คแค่มี / ไม่มี
  if (!content || typeof content !== "string" || content.trim() === "" || content.length > 300 ) {
    return res.status(400).json({
      message: "Invalid request data."
    });
  }

  next();
};
