import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "My API",
    version: "1.0.0",
    description: "API documentation",
  },
  servers: [
    {
      url: "http://localhost:4000",
    },
  ],
};

const options = {
  definition: swaggerDefinition, // 🔹 ใช้ definition (ชื่อใหม่ของ swagger-jsdoc)
  apis: [
    "./routes/**/*.mjs",     // routes ทั้งหมด
    "./swagger/**/*.js"      // schemas + paths
  ],
};

export const swaggerSpec = swaggerJSDoc(options);
