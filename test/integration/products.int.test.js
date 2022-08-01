const request = require("supertest");
const app = require("../../server");

const newProductData = require("../data/new-product.json");

let firstProduct;

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

it("GET /api/products", async () => {
  const response = await request(app).get("/api/products");
  expect(response.statusCode).toBe(200);
  expect(Array.isArray(response.body)).toBeTruthy();
  expect(response.body[0].name).toBeDefined();
  expect(response.body[0].description).toBeDefined();
  firstProduct = response.body[0];
});

it("GET /api/products/:productId", async () => {
  const response = await request(app).get(`/api/products/${firstProduct._id}`);
  expect(response.statusCode).toBe(200);
  expect(response.body.name).toBe(firstProduct.name);
  expect(response.body.description).toBe(firstProduct.description);
});

it("Get id doesnt exist /api/products/:productId", async () => {
  const response = await request(app).get(
    "/api/products/62e097ff545bbb8b1002b137"
  );
  expect(response.statusCode).toBe(404);
});

it("PUT /api/products/:productId", async () => {
  const res = await request(app)
    .put(`/api/products/${firstProduct._id}`)
    .send({ name: "updated name", description: "updated description" });
  expect(res.statusCode).toBe(200);
  expect(res.body.name).toBe("updated name");
  expect(res.body.description).toBe("updated description");
});

it("should return 404 on PUT /api/products/:productId", async () => {
  const res = await request(app)
    .put("/api/products/62e097ff545bbb8b1002b137")
    .send({ name: "updated name", description: "updated description" });

  expect(res.statusCode).toBe(404);
});

it("DELETE /api/products/:productId", async () => {
  console.log("첫번쨰 상품:", firstProduct);
  const res = await request(app)
    .delete(`/api/products/${firstProduct._id}`)
    .send();
  expect(res.statusCode).toBe(200);
});

it("DELETE id doesnt dexist /api/products/:productId", async () => {
  const res = await request(app)
    .delete(`/api/products/${firstProduct._id}`)
    .send();

  expect(res.statusCode).toBe(404);
});
