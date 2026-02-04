import express from "express";
import swaggerUi from "swagger-ui-express";
import cors from "cors";
import "dotenv/config";

import { swaggerSpec } from "./swagger/index.mjs";

import questionRouter from "./routes/questionRouter.mjs";
import answerRouter from "./routes/answerRouter.mjs";
import voteAnswerRouter from "./routes/voteAnswerRouter.mjs";

const app = express();

// ✅ body parser มาก่อน
app.use(express.json());

// ✅ CORS
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "https://personal-blog-react-32p2.app",
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  })
);

// ✅ Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/swagger.json", (req, res) => {
  res.status(200).json(swaggerSpec);
});

// ✅ Routes จริง
app.use("/questions", questionRouter);
app.use("/questions", answerRouter);
app.use("/answers", voteAnswerRouter);

app.get("/test", (req, res) => {
  res.json("S
