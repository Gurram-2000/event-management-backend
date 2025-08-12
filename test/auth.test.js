const chai = require("chai");
const request = require("supertest");
const app = require("../app");

const expect = chai.expect;

describe("Auth API", () => {
  let testUser = {
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
    role: "organizer"
  };

  it("should register a new user", async () => {
    const res = await request(app).post("/api/auth/register").send(testUser);

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property("token");
    expect(res.body.user.email).to.equal(testUser.email);
  });

  it("should not allow duplicate registration", async () => {
    const res = await request(app).post("/api/auth/register").send(testUser);
    expect(res.status).to.equal(400);
    expect(res.body.message).to.equal("User already exists");
  });

  it("should fail login with wrong password", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: testUser.email,
      password: "wrongpassword"
    });
    expect(res.status).to.equal(401);
  });

  it("should log in with correct credentials", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: testUser.email,
      password: testUser.password
    });

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("token");
  });
});
