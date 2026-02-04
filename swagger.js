// swagger.js
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
  swaggerDefinition,
  apis: [
  "./routes/*.mjs",
  "./swagger/**/*.js"
]
};

export const swaggerSpec = swaggerJSDoc(options);
