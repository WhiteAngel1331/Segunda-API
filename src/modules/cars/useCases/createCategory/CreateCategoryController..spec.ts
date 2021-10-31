import {app} from "@shared/infra/http/app";
import request from "supertest";

describe("Create Category Controller", () => {
  it("should be able to create a new category", async () => {
    const response = await request(app).post("/categories").send({
      name: "Carros",
      description: "Carros da categoria",
    });

    expect(response.body).toEqual(null);
    expect(response.status).toBe(201);
  });
});
