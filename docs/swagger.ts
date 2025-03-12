import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express'; 
import {Express} from 'express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Fitness API',
      version: '1.0.0',
      description: 'API for a fitness app',
    },
    paths: {
      "/achievements": {
        post: {
          tags: ['Achievements'],
          description: "Create a new achievement",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    title: { type: "string" },
                    description: { type: "string" },
                    progressGoal: { type: "number" },
                  },
                },
              },
            },
          },
          responses: {
            201: { description: "Achievement created successfully" },
            400: { description: "Invalid input" },
          },
        },
        get: {
          tags: ['Achievements'],
          description: "Get all achievements",
          responses: {
            200: { description: "A list of achievements" },
            500: { description: "Error fetching achievements" },
          },
        },
      },
      "/achievements/{id}": {
        get: {
          tags: ['Achievements'],
          description: "Get an achievement by ID",
          parameters: [{ in: "path", name: "id", required: true, type: "string" }],
          responses: {
            200: { description: "The achievement details" },
            404: { description: "Achievement not found" },
            500: { description: "Error fetching achievement" },
          },
        },
        put: {
          tags: ['Achievements'],
          description: "Update an achievement by ID",
          parameters: [{ in: "path", name: "id", required: true, type: "string" }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    title: { type: "string" },
                    description: { type: "string" },
                    progressGoal: { type: "number" },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: "Achievement updated successfully" },
            404: { description: "Achievement not found" },
            500: { description: "Error updating achievement" },
          },
        },
        delete: {
          tags: ['Achievements'],
          description: "Delete an achievement by ID",
          parameters: [{ in: "path", name: "id", required: true, type: "string" }],
          responses: {
            200: { description: "Achievement deleted successfully" },
            404: { description: "Achievement not found" },
            500: { description: "Error deleting achievement" },
          },
        },
      },
    },
  },
  apis: ['./routes/*.ts'], 
};


const specs = swaggerJsdoc(options);

console.log(specs);

const swaggerDocs = (app: Express) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};

export default swaggerDocs;