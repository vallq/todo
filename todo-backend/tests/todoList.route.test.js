const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../app");
const TodoItem = require("../models/todoItem.model");

describe("Todo List", () => {
  let mongoServer;
  beforeAll(async () => {
    try {
      mongoServer = new MongoMemoryServer();
      const mongoUri = await mongoServer.getConnectionString();
      const mongoOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      };
      await mongoose.connect(mongoUri, mongoOptions);
    } catch (err) {
      console.error(err);
    }
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  beforeEach(async () => {
    const allTodoItems = [
      {
        id: "754aece9-64bf-42ab-b91c-bb65e2db3a37",
        value: "buy milk",
        completed: false,
      },
      {
        id: "75442486-0878-440c-9db1-a7006c25a39f",
        value: "send email",
        completed: false,
      },
    ];
    await TodoItem.create(allTodoItems);
  });

  afterEach(async () => {
    jest.resetAllMocks();
    await TodoItem.deleteMany();
  });

  describe("/", () => {
    it("GET / should return all todo items", async () => {
      const expectedData = [
        {
          id: "754aece9-64bf-42ab-b91c-bb65e2db3a37",
          value: "buy milk",
          completed: false,
        },
        {
          id: "75442486-0878-440c-9db1-a7006c25a39f",
          value: "send email",
          completed: false,
        },
      ];

      const { body: TodoData } = await request(app)
        .get("/todolist")
        .expect(200);
      expect(TodoData).toMatchObject(expectedData);
    });
  });
});
