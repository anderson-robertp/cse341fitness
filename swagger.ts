import swaggerAutogen from "swagger-autogen";
import env from "dotenv";

const doc = {
    info: {
        title: "Fitness API",
        description: "An API for tracking fitness data",
    },
    schemes: ["http"],
    security: [
        {
            oauth2: [], // Global security for OAuth2
        },
    ],
    scopes: {
        openid: "OpenID authentication",
        profile: "Profile information",
        email: "Email information",
    },
    components: {
        securitySchemes: {
            oauth2: {
                type: "oauth2",
                flows: {
                    authorizationCode: {
                        authorizationUrl:
                            "https://cse341fitness.onrender.com/authentication/google",
                        tokenUrl: "https://oauth2.googleapis.com/token", // Token URL for Google OAuth (replace with your provider)
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

//AuthorizationUrl for development: https://127.0.0.1:3000/authentication/google
//AuthorizationUrl for production: https://cse341fitness.onrender.com/authentication/google
