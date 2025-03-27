import {
    InitializeInMemoryDatabase,
    CloseInMemoryDatabase,
} from "./db/connection";

beforeAll(async () => {
    await InitializeInMemoryDatabase();
});

afterAll(async () => {
    await CloseInMemoryDatabase();
});
