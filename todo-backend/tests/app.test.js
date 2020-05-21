const request = require("supertest");
const app = require("../app");

describe("app.js", () => {
  describe("/", () => {
    it("GET / should return the API endpoints", async () => {
      const apiEndpoints = {
        "0": "GET /",
        "1": "GET /todolist",
        "2": "POST /todolist",
        "3": "PATCH /todolist/:id",
        "4": "DELETE /todolist/:id",
        "5": "DELETE /todolist/",
      };
      const { body: response } = await request(app).get("/").expect(200);
      expect(response).toMatchObject(apiEndpoints);
    });
  });
});
