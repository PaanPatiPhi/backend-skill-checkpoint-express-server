// swagger/index.mjs
import swaggerJSDoc from "swagger-jsdoc";
import path from "path";
import { fileURLToPath } from "url";

// แปลง __dirname สำหรับ ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Swagger base definition
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
      description: "Production (Vercel main)",
    },
    {
      url: "https://backend-skill-checkpoint-express-se-opal.vercel.app",
      description: "Production (Vercel alt)",
    },
    {
      url: "http://localhost:4000",
      description: "Local development",
    },
  ],
};

// swagger-jsdoc options
const options = {
  swaggerDefinition,
  apis: [
    // ✅ Express routes ตัวจริง
    path.join(__dirname, "../../routes/**/*.mjs"),

    // ✅ Swagger path definitions
    path.join(__dirname, "./paths/**/*.js"),
  ],
};

// Export swagger spec
export const swaggerSpec = swaggerJSDoc(options);
