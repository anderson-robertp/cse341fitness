import {
    InitializeInMemoryDatabase,
    CloseInMemoryDatabase,
} from "./db/connection";

process.env.NODE_ENV = "test";

beforeAll(async () => {
    await InitializeInMemoryDatabase();
});

afterAll(async () => {
    await CloseInMemoryDatabase();
});
