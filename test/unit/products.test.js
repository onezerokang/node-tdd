// describe안에 테스트 케이스(it)를 넣는다.
// describe: 여러 관련 테스트를 그룹화 하는 블록
// it: 개별 테스트를 수행하는 곳, 각 테스트르 작은 문장처럼 설명한다.
// expect: 값을 테스트할 때마다 사용한다. expect 함수는 혼자서는 거의 사용되지 않으며 matcher와 함꼐 사용한다.
// matcher: 다른 방법으로 값을 테스트 "매처"를 사용합니다.

const httpMocks = require("node-mocks-http");
const productController = require("../../controllers/product");
const ProductModel = require("../../models/Product");
const newProduct = require("../data/new-product.json");

// 몽구스는 문제 없다는 가정하에 mock function을 만든 것
ProductModel.create = jest.fn();

// TDD에서는 테스트 케이스를 먼저 작성하고 해당 테스트가 통과할 수 있게 실제 코드를 작성한다.

// beforeEach: 여러 테스트 안에 공통된 코드가 있다면 beforeEach를 사용해 반복을 줄여줄 수 있다.ㅇ
// 테스트가 실행되기전에 beforeEach 코드가 먼저 실행된다.

let req, res, next;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});

describe("Product Controller Create", () => {
  beforeEach(() => {
    req.body = newProduct;
  });

  it("should have a createProduct function", () => {
    expect(typeof productController.createProduct).toBe("function");
  });

  it("should call ProductModel.create", async () => {
    await productController.createProduct(req, res, next);
    expect(ProductModel.create).toBeCalledWith(newProduct);
  });

  it("should return 201 response code", async () => {
    await productController.createProduct(req, res, next);
    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it("should return json body in response", async () => {
    ProductModel.create.mockReturnValue(newProduct);
    await productController.createProduct(req, res, next);
    expect(res._getJSONData()).toStrictEqual(newProduct);
  });

  // express에서 동기요청에 에러가 발생했을 때는 express가 에러를 알아서 처리해준다.
  // 비동기요청은 express가 망가져버린다.
  // next()를 통해서 에러를 잘 넘겨주는 것이다.

  it("should handle errors", async () => {
    const errorMessage = { message: "description property missing" };
    const rejectedPromise = Promise.reject(errorMessage);

    ProductModel.create.mockReturnValue(rejectedPromise);
    await productController.createProduct(req, res, next);

    expect(next).toBeCalledWith(errorMessage);
  });
});
