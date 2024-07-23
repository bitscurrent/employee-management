import { Express, Request,Response } from "express";
import swaggerJsDoc from "swagger-jsdoc"
import swagggerUi from "swagger-ui-express"



const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Employee Management API',
        version: '1.0.0',
        description: 'API documentation for the Employee Management system',
      },
      servers: [
        {
          url: 'http://localhost:5000', 
        },
      ],
    },
    apis: ["./src/routers/*.ts"], // Path to the API docs
  };


  const swaggerSpec = swaggerJsDoc(options);

export { swagggerUi, swaggerSpec };