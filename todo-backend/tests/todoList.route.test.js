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
      ];

      const { body: TodoData } = await request(app)
        .get("/todolist")
        .expect(200);
      expect(TodoData).toMatchObject(expectedData);
    });

    it("POST should return status 201 and data of new todo item created", async () => {
      const expectedTodoItem = {
        id: "754aece9-64bf-42ab-b91c-bb65e2db3a55",
        value: "get some stamps",
        completed: false,
      };

      const { body: postedTodoItem } = await request(app)
        .post("/todolist")
        .send(expectedTodoItem)
        .expect(201);
      expect(postedTodoItem).toMatchObject(expectedTodoItem);
    });

    it("PATCH should return status 200 and data of updated todo item", async () => {
      const expectedTodoItem = {
        id: "754aece9-64bf-42ab-b91c-bb65e2db3a37",
        value: "buy milk",
        completed: true,
      };

      const propertyToPatch = {
        id: "754aece9-64bf-42ab-b91c-bb65e2db3a37",
        completed: true,
      };

      const { body: patchedTodoItem } = await request(app)
        .patch(`/todolist/${propertyToPatch.id}`)
        .send(propertyToPatch)
        .expect(200);
      expect(patchedTodoItem).toMatchObject(expectedTodoItem);
    });
  });
});
