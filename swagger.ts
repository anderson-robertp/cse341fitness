import swaggerAutogen from "swagger-autogen";

const doc = {
    info: {
        title: "Fitness API",
        description: "An API for tracking fitness data",
    },
    host: "localhost:3000", // Change this when deploying to production
    schemes: ["http"], // Update to "https" when deployed
    components: {
        securitySchemes: {
            BearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
                description: "JWT Authentication",
            },
            oauth2: {
                type: "oauth2",
                flows: {
                    authorizationCode: {
                        authorizationUrl:
                            "https://accounts.google.com/o/oauth2/v2/auth",
                        tokenUrl: "https://oauth2.googleapis.com/token",
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
    security: [
        {
            BearerAuth: [], // Enables JWT authentication
        },
        {
            oauth2: ["openid", "profile", "email"], // Global security for OAuth2
        },
    ],
};

const outputFile = "./swagger.json";
const endpointFiles = ["./routes/index.ts"];

swaggerAutogen(outputFile, endpointFiles, doc);

export { outputFile };
