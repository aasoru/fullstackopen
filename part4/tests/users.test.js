const { describe, test, after } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const app = require("../app");

const listHelper = require("../utils/list_helpers");

const api = supertest(app);

describe("test if password is too short", () => {
  test("creation fails with a password that is too short", async () => {
    const usersAtStart = await listHelper.usersInDb();

    const newUser = {
      username: "testuser",
      name: "Testuser",
      password: "aa",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await listHelper.usersInDb();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
  });

  test("creation fails with a username that is too short", async () => {
    const usersAtStart = await listHelper.usersInDb();

    const newUser = {
      username: "aa",
      name: "Testuser",
      password: "test",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await listHelper.usersInDb();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
  });
});

after(async () => {
  await mongoose.connection.close();
});
