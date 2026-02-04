export const validateQuestion = (req,res,next) => {
 const errors = {};
 const {title , description, category} = req.body;
 if (!title){
    errors.title = "Title is required";
 }
 if (!description){
    errors.description = "Description is required";
 }
 if (!category){
    errors.category = "Category is required";
 }
 if (Object.keys(errors).length >0){
    return res.status(400).json(
        {message: "Invalid request data.",
            errors
        }
    )
 }
 next();
}
