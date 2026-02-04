import { Router } from "express";
import connectionPool from "../utils/db.mjs";
import { validateQuestion } from "../middlewares/validateQuestion.mjs";
import { validateSearchQuery } from "../middlewares/validateSearchQuery.mjs";
import { validateCreateAnswer } from "../middlewares/validateCreateAnswer.mjs";

const questionRouter = Router();


questionRouter.get("/",async (req,res)=>{
try{
  const results = await connectionPool.query(`select * from questions`);
  return res.status(200).json({
    data: results.rows
  });
}
catch(error){
    return res.status(500).json({
        message:"Unable to fetch questions."
    });
};
})

questionRouter.get("/search",[validateSearchQuery], async (req,res)=>{
    try{
            const {title, category} = req.query;
            console.log(req.query);
            const results = await connectionPool.query(
                `
                SELECT * FROM questions
                WHERE
                (title ILIKE '%' || CAST($1 AS TEXT) || '%' OR $1 IS NULL)
                AND
                (category = $2 OR $2 IS NULL);
            `,
            [
                title,
                category
            ]
        )
        return res.status(200).json(
            {data: results.rows}
        )

            }
    catch(error){
        return res.status(500).json(
            {message: "Unable to fetch a question."}
        )
    }
});

questionRouter.get("/:questionId", async (req,res)=>{
    try{
    const questionIdFromClient = req.params.questionId;
    const question = await connectionPool.query(`select * from questions where id = $1`,[questionIdFromClient])
    if (!question.rows[0]){
        return res.status(404).json({
            message:`Question ${questionIdFromClient} not found`
        });
    }
  return res.status(200).json({
        data : question.rows[0]
    });
}
catch(error){
    return res.status(500).json(
        {
            message: "Unable to fetch questions."
        }
    )
}
});

questionRouter.post("/",[validateQuestion],async (req,res)=>{
try
{    const { title , description, category} = req.body;
    await connectionPool.query(
        `
        insert into questions (title, description, category)
        values($1, $2, $3)
        `,[
            title,
            description,
            category
        ]
    )
    return res.status(201).json(
        {  message: "Question created successfully."}
    )
}
catch(error){
    return res.status(500).json(
        {message: "Unable to create question."}
    )
}
})

questionRouter.put("/:questionId", async (req,res)=>{
    try{
        const questionIdFromClient = req.params.questionId;
        const {title, description, category} = req.body;
        const hasFound = await connectionPool.query(`select * from questions where id = $1`,[questionIdFromClient]);
        if (!hasFound.rows[0]){
            return res.status(404).json(
                {message: "Question not found."}
            );
        }
        await connectionPool.query(
            `
            update questions
            set title = $2,
            description = $3,
            category = $4
            where id = $1
            `,
            [
                questionIdFromClient,
                title,
                description,
                category
            ]
        )
        return res.status(200).json(
            {  message: "Question updated successfully."}
        )
    }
    catch(error){
        return res.status(500).json(
            {message: "Unable to fetch questions."}
        )
    }
});

questionRouter.delete("/:questionId", async (req,res)=>{
    try{
        const questionIdFromClient = req.params.questionId;
        const hasFound = await connectionPool.query(`select * from questions where id = $1`,[questionIdFromClient]);
        if (!hasFound.rows[0]){
            return res.status(404).json(
                {message: "Question not found."}
            );
        }
        await connectionPool.query(
            `
            delete from questions where id = $1
            `,
            [questionIdFromClient]
        )
        return res.status(200).json(
            {  message: "Question post has been deleted successfully."}
        )
    }
        catch(error){
            return res.status(500).json(
                {message: "Unable to delete question."}
            )
        }
});


export default questionRouter