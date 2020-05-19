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
    let allTodoItems = [
      {
        id: "754aece9-64bf-42ab-b91c-bb65e2db3a37",
        value: "buy milk",
        completed: false,
      },
      {
        id: "754aece9-64bf-42ab-b91c-bb65e2db3a55",
        value: "bake cookies",
        completed: true,
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
          id: "754aece9-64bf-42ab-b91c-bb65e2db3a55",
          value: "bake cookies",
          completed: true,
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

    it("PATCH should return status 200 and updated status of todo item", async () => {
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

    it("PATCH should return status 200 and updated value of todo item", async () => {
      const expectedTodoItem = {
        id: "754aece9-64bf-42ab-b91c-bb65e2db3a37",
        value: "buy apples",
        completed: false,
      };

      const propertyToPatch = {
        id: "754aece9-64bf-42ab-b91c-bb65e2db3a37",
        value: "buy apples",
      };

      const { body: patchedTodoItem } = await request(app)
        .patch(`/todolist/${propertyToPatch.id}`)
        .send(propertyToPatch)
        .expect(200);
      expect(patchedTodoItem).toMatchObject(expectedTodoItem);
    });

    it("DELETE should return status 200 and return todo item that has been deleted", async () => {
      const expectedTodoItem = {
        id: "754aece9-64bf-42ab-b91c-bb65e2db3a37",
        value: "buy milk",
        completed: false,
      };

      const { body: deletedTodoItem } = await request(app)
        .delete(`/todolist/${expectedTodoItem.id}`)
        .expect(200);
      expect(deletedTodoItem).toMatchObject(expectedTodoItem);
    });
    
    it("DELETE should return status 200 and return number of todo items that have been deleted", async () => {
      const expectedData = { ok: 1, deletedCount: 1, n: 1 };
      const { body: deletedCount } = await request(app)
        .delete("/todolist")
        .expect(200);
      expect(deletedCount).toMatchObject(expectedData);
    });
  });
});
