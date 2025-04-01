import swaggerAutogen from "swagger-autogen";

const doc = {
    openapi: "3.0.0",
    info: {
        title: "Fitness API",
        description: "An API for tracking fitness data",
    },
    servers: [
        {
            url: "http://localhost:3000",
            description: "Development server",
        },
        {
            url: "https://cse341fitness.onrender.com",
            description: "Production Server",
        },
    ],
    components: {
        securitySchemes: {
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
            SessionAuth: {
                type: "apiKey",
                in: "cookie",
                name: "connect.sid", // Default session cookie name
            },
        },
    },
    security: [
        {
            oauth2: ["opendid", "profile", "email"], // Global security for OAuth2
        },
        { SessionAuth: [] },
    ],
};

const outputFile = "./swagger.json";
const endpointFiles = ["./routes/index.ts"];

swaggerAutogen({ openapi: "3.0.0" })(outputFile, endpointFiles, doc);
