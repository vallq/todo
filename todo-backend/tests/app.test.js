const request = require("supertest");
const app = require("../app");


describe("app.js", () => {
  describe("/", () => {
    it("GET / should return the API endpoints", async () => {
      const apiEndpoints = {
        "0": "GET /",
        "1": "GET /todo",
        "2": "GET /todo/:id",
      };
      const { body: response } = await request(app)
        .get("/")
        .expect(200);
      expect(response).toMatchObject(apiEndpoints);
    });
  });
});
