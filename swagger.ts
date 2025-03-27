import swaggerAutogen from "swagger-autogen";

const doc = {
    info: {
        title: "Fitness API",
        description: "An API for tracking fitness data",
    },
    host: "localhost:3000", // Change this when deploying to production
    schemes: ["http"], // Update to "https" when deployed
    security: [
        {
            oauth2: [], // Global security for OAuth2
        },
    ],
    components: {
        securitySchemes: {
            oauth2: {
                type: "oauth2",
                flows: {
                    authorizationCode: {
                        authorizationUrl:
                            "http://localhost:3000/authentication/google/",
                        tokenUrl: "https://oauth2.googleapis.com/token",
                        clientId: process.env.CLIENT_ID,
                        clientSecret: process.env.CLIENT_SECRET,
                        scopes: {
                            openid: "OpenID authentication",
                            profile: "Profile information",
                            email: "Email information",
                        },
                    },
                },
            },
        },
    },
};

const outputFile = "./swagger.json";
const endpointFiles = ["./routes/index.ts"];

swaggerAutogen(outputFile, endpointFiles, doc);
