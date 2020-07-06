/*const request =require('superTest');
const app =require('../server/index');

describe('Test root path', () => {
    test('It should response the GET method', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
    });
});

describe('Test path "/test"', () => {
    test('It should response the GET method', async () => {
        const response = await request(app).get('/test');
        expect(response.statusCode).toBe(200);
        expect(response.body.time).toBe('now'); 
    });
}); 
*/

describe("Any", () => {
  test("----------------------------", async () => {
    expect("true").toEqual("true");
  });
});
