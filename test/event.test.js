const chai = require("chai");
const request = require("supertest");
const app = require("../app");

const expect = chai.expect;

describe("Event API", () => {
  let token;
  let eventId;

  const user = {
    name: "Jane Organizer",
    email: "jane@example.com",
    password: "password123",
    role: "organizer"
  };

  before(async () => {
    await request(app).post("/api/auth/register").send(user);
    const loginRes = await request(app).post("/api/auth/login").send({
      email: user.email,
      password: user.password
    });
    token = loginRes.body.token;
  });

  it("should create an event", async () => {
    const res = await request(app)
      .post("/api/events")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Tech Conference",
        date: "2025-10-01",
        time: "10:00",
        description: "An event for tech enthusiasts"
      });

    expect(res.status).to.equal(201);
    expect(res.body.title).to.equal("Tech Conference");
    eventId = res.body.id;
  });

  it("should get all events", async () => {
    const res = await request(app)
      .get("/api/events")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body.length).to.be.greaterThan(0);
  });

  it("should update an event", async () => {
    const res = await request(app)
      .put(`/api/events/${eventId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ description: "Updated description" });

    expect(res.status).to.equal(200);
    expect(res.body.description).to.equal("Updated description");
  });

  it("should register another user and let them register for an event", async () => {
    const attendee = {
      name: "Alex Attendee",
      email: "alex@example.com",
      password: "attendee123",
      role: "attendee"
    };

    await request(app).post("/api/auth/register").send(attendee);
    const loginRes = await request(app).post("/api/auth/login").send({
      email: attendee.email,
      password: attendee.password
    });

    const attendeeToken = loginRes.body.token;

    const res = await request(app)
      .post(`/api/events/${eventId}/register`)
      .set("Authorization", `Bearer ${attendeeToken}`);

    expect(res.status).to.equal(200);
    expect(res.body.message).to.equal("Registered for event");
  });

  it("should delete the event", async () => {
    const res = await request(app)
      .delete(`/api/events/${eventId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body.message).to.equal("Event deleted");
  });

  it("should return 404 for non-existing event update", async () => {
    const res = await request(app)
      .put(`/api/events/99999`)
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "New Title" });

    expect(res.status).to.be.oneOf([403, 404]);
  });
});
