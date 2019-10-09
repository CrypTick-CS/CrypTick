const app = require('./app_server');

// conventional server functionality split into separate app.js
// in order to be able to test express using Jest
// http://www.albertgao.xyz/2017/05/24/how-to-test-expressjs-with-jest-and-supertest/

app.listen(3000, () => console.log('server is running on 3000'))
