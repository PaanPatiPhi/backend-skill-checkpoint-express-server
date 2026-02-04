export const validateSearchQuery = (req, res, next) => {
  const { title, category } = req.query;

  const hasTitle =
    typeof title === "string" && title.trim().length > 0;

  const hasCategory =
    typeof category === "string" && category.trim().length > 0;

  if (!hasTitle && !hasCategory) {
    return res.status(400).json({
      message: "Invalid search parameters."
    });
  }

  next();
};
