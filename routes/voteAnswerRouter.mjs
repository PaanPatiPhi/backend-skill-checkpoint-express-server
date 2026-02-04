import { Router } from "express";
import connectionPool from "../utils/db.mjs";
import { validateVote } from "../middlewares/validateVote.mjs";

const voteAnswerRouter = Router();

voteAnswerRouter.post("/:answerId/vote",[validateVote] , async (req,res)=>{
        try{
        const answerIdFromClient = req.params.answerId;
        const vote = req.body.vote;
        const hasFound = await connectionPool.query(`select * from answer_votes where answer_id = $1`,[answerIdFromClient]);
        if (!hasFound.rows[0]){
            return res.status(404).json(
                {message: "Answer not found."}
            );
        }
        console.log(vote)
        await connectionPool.query(`
            update answer_votes
            set vote = $2
            where answer_id = $1
        `,
        [answerIdFromClient,
             vote]
      );
      return res.status(200).json(
        {message: "Vote on the answer has been recorded successfully."}
      )
    }
    catch (error){
        console.log(error)
        return res.status(500).json(
            {message: "Unable to vote answer."}
        )
    }
})

export default voteAnswerRouter