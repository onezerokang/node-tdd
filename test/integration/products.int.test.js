const request = require("supertest");
const app = require("../../server");

const newProductData = require("../data/new-product.json");

it("POST /api/products", async () => {
  const response = await request(app)
    .post("/api/products")
    .send(newProductData);

  expect(response.statusCode).toBe(201);
  expect(response.body.name).toBe(newProductData.name);
  expect(response.body.description).toBe(newProductData.description);
  expect(response.body.price).toBe(newProductData.price);
});

it("should return 500 on POST /api/products", async () => {
  const response = await request(app)
    .post("/api/products")
    .send({ name: "macbook" });

  expect(response.statusCode).toBe(500);

  expect(response.body).toStrictEqual({
    message:
      "Product validation failed: price: Path `price` is required., description: Path `description` is required.",
  });
});
