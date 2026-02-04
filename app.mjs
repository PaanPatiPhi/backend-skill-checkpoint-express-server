import express from "express";
import questionRouter from "./routes/questionRouter.mjs";
import answerRouter from "./routes/answerRouter.mjs";
import cors from "cors";
import "dotenv/config";
import voteAnswerRouter from "./routes/voteAnswerRouter.mjs";

const app = express();
const port =process.env.PORT || 4000;
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173", 
      "http://localhost:3000",
      "https://personal-blog-react-32p2.app",
    ],
    methods:["GET","POST","PUT","PATCH","DELETE","OPTION"]
  })
);

app.use("/questions", questionRouter);
app.use("/questions", answerRouter);
app.use("/answers", voteAnswerRouter)

app.get("/test", (req, res) => {
  return res.json("Server API is working 🚀");
});


app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
