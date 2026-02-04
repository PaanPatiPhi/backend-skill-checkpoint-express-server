import swaggerJSDoc from "swagger-jsdoc";
import path from "path";
import { fileURLToPath } from "url";

// 👉 import schemas ให้ swagger โหลดจริง
import "./schemas/answer.schema.js";
import "./schemas/error.schema.js";
import "./schemas/question.schema.js";
import "./schemas/vote.schema.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "My API",
    version: "1.0.0",
    description: "API documentation",
  },
  servers: [
    { url: "https://backend-skill-checkpoint-express-se-opal.vercel.app" },
    { url: "http://localhost:4000" },
  ],
};

const options = {
  definition: swaggerDefinition, // ❗ ใช้ definition (ไม่ใช่ swaggerDefinition)
  apis: [
    path.join(__dirname, "./paths/**/*.js"), // swagger paths
    path.join(__dirname, "../routes/**/*.mjs"), // routes (ถ้ามี jsdoc)
  ],
};

export const swaggerSpec = swaggerJSDoc(options);
