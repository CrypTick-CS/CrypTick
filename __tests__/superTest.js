const request = require('supertest');
const app = require('../server/app');

describe('Test the root path, bitch', () => {
  test('It should respond to the GET method', (done) => {
    request(app).get('/').then((response)=>{
      expect(response.statusCode).toBe(200);
      done();
    });
  });
});
