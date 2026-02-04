import { Router } from "express";
import { validateCreateAnswer } from "../middlewares/validateCreateAnswer.mjs";
import connectionPool from "../utils/db.mjs";

const answerRouter = Router();

answerRouter.post("/:questionId/answers",[validateCreateAnswer] ,async (req,res)=>{
 try
    {
    const {content} = req.body;
    const questionIdFromClient = req.params.questionId;
    console.log(questionIdFromClient)
    const hasFound = await connectionPool.query(`select * from questions where id = $1`,[questionIdFromClient]);
    console.log(hasFound)
    if (!hasFound.rows[0]){
        return res.status(404).json(
        {message: "Question not found."}
        );
    };
    await connectionPool.query(`
        insert into answers (question_id, content)
        values ($1, $2)
        `,
    [questionIdFromClient,
        content
    ])
    return res.status(201).json(
        {message: "Answer created successfully."}
    )}
    catch(error){
        console.log(error)
        return res.status(500).json(
            {message: "Unable to create answers."}
        )
    }
})

answerRouter.get("/:questionId/answers", async (req,res)=>{
        try{
    const questionIdFromClient = req.params.questionId;
    const results = await connectionPool.query(`select * from answers where question_id = $1`,[questionIdFromClient])
    if (!results.rows[0]){
        return res.status(404).json({
            message:`Question ${questionIdFromClient} not found`
        });
    }
  return res.status(200).json({
        data : results.rows
    });
}
catch(error){
    return res.status(500).json(
        {
            message: "Unable to fetch answers."
        }
    )
}
})

answerRouter.delete("/:questionId/answers", async (req,res)=>{
    try{
        const questionIdFromClient = req.params.questionId;
        const hasFound = await connectionPool.query(`select * from answers where question_id = $1`,[questionIdFromClient]);
        if (!hasFound.rows[0]){
            return res.status(404).json(
                {message: "Question not found."}
            );
        }
        await connectionPool.query(
            `
            delete from answers where question_id = $1
            `,
            [questionIdFromClient]
        )
        return res.status(200).json(
            {message: "All answers for the question have been deleted successfully."}
        )
    }
        catch(error){
            return res.status(500).json(
                {message: "Unable to delete answers."}
            )
        }
});



export default answerRouter