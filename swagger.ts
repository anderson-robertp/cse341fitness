import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "Fitness API",
    description: "An API for tracking fitness data",
  },
  host: ["cse341fitness.onrender.com"],
  schemes: ["https"],
  securityDefinitions: {
    OAuth2: {
      type: "oauth2",
      authorizationUrl:
        "https://cse341fitness.onrender.com/authentication/google",
      flow: "implicit",
    },
  },
};

const outputFile = "./swagger.json";
const endpointFiles = ["./routes/index.ts"];

export const generateSwaggerDocs = async () => {
  await swaggerAutogen()(outputFile, endpointFiles, doc);
  console.log("Swagger JSON file generated successfully.");
};
