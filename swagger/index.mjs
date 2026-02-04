import swaggerJSDoc from "swagger-jsdoc";
import path from "path";
import { fileURLToPath } from "url";
import { url } from "inspector";

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
    {
      url: "https://backend-skill-checkpoint-expr-git-3072d9-phis-projects-e10d8e3b.vercel.app",
    },
    {
        url:"https://backend-skill-checkpoint-express-se-opal.vercel.app/"
    },
    {
        url:"http://localhost:4000"
    }
  ],
};

const options = {
  swaggerDefinition,
  apis: [
    // ✅ routes (Express ตัวจริง)
    path.join(__dirname, "../../routes/**/*.mjs"),

    // ✅ swagger path definitions
    path.join(__dirname, "./paths/**/*.js"),
  ],
};

export const swaggerSpec = swaggerJSDoc(options);
