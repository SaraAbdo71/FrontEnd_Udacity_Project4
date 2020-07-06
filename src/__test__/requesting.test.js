var reqPost = require("../server/request");
var validateRequest = reqPost.validateInputRequest;
var httpMocks = require("node-mocks-http");

describe('Test,the function "validateRequest()"should exist', () => {
  test("It should return true", async () => {
    expect(validateRequest).toBeDefined();
  });
});

describe('Test "validateRequest()"should be a function', () => {
  test("It should be a function", async () => {
    expect(typeof validateRequest).toBe("function");
  });
});

describe('Test, the function "validateRequest()" throw error if incorrect user inputs', () => {
  test("validateRequest should throw error if incorrect user inputs", () => {
    const next = jest.fn();
    const req = httpMocks.createRequest({
      body: {
        url: "https://api.aylien.com/api/v1",
      },
    });
    const res = httpMocks.createResponse();
    validateRequest(req, res, next);
    //validate Http result
    expect(res.statusCode).toBe(400);
    expect(res._isJSON()).toBeTruthy();
    // validate message
    const json = JSON.parse(res._getData());
    expect(json.message).toBe("Invalid Input");
  });
});
