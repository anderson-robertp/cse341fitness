import {
    InitializeInMemoryDatabase,
    CloseInMemoryDatabase,
} from "./db/connection";

process.env.NODE_ENV = "test";

beforeAll(async () => {
    await InitializeInMemoryDatabase();
    console.log("In-memory database initialized.");
});

afterAll(async () => {
    await CloseInMemoryDatabase();
});
