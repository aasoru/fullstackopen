const { test, after } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("blog posts have id property", async () => {
  const response = await api.get("/api/blogs");

  const blog = response.body[0];

  if (!blog.id) {
    throw new Error("blog does not have id property");
  }

  if (blog._id) {
    throw new Error("blog has _id property");
  }
});

after(async () => {
  await mongoose.connection.close();
});
