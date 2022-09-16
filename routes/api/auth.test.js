/*ответ должен иметь статус-код 200
в ответе должен возвращаться токен
в ответе должен возвращаться объект user с 2 полями email и subscription, имеющие тип данных String*/
const gravatar = require("gravatar");
const mongoose = require("mongoose");
const request = require("supertest");
require("dotenv").config();

const app = require("../../app");
const { User } = require("../../models/user");

const { DB_HOST_TEST, PORT} = process.env;

describe("test auth routes", () => {
  let server;
  beforeAll(() => (server = app.listen(PORT)));
  afterAll(() => server.close());

  beforeEach((done) => {
    mongoose.connect(DB_HOST_TEST).then(() => done());
  });

//   afterEach((done) => {
//     mongoose.connection.db.dropCollection(() => {
//       mongoose.connection.close(() => done());
//     });
afterEach((done) => {
    User.collection.drop(() => {
      mongoose.connection.close(() => done());
    });

});

  test("test login route", async () => {
    const newUser = new User ({
      email: "aaa1@gmail.com",
      password: "123456",
      repeat_password:"123456",
      avatarURL: gravatar.url(this.email),
    });
    await User.create(newUser);

    const loginUser = {
      email: "aaa1@gmail.com",
      password: "123456",
    };
    const response = 
      await request(app).post("/api/auth/register")
    .send(loginUser);
    
    const { body } = response;
    const { email, avatarURL } = body;
    expect(response.statusCode).toBe(200);
    expect(typeof email).toBe("string");
    expect(typeof avatarURL).toBe("string");


    // const { body } = response;
    // expect(body.token).toByTruthy();
    // const { token } = await User.findById(user._id);
    // expect(body.token).toBe(token);
  });
});
