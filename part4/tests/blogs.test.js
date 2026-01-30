const { test, after } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");

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

test("add a blog", async () => {
  const blogsAtStart = await Blog.find({});
  const initialLength = blogsAtStart.length;

  const newBlog = {
    title: "new Blog",
    author: "author1235434",
    url: "url",
    likes: 2,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201) // Full Stack Open espera status 201 Created
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await Blog.find({});

  if (blogsAtEnd.length !== initialLength + 1) {
    throw new Error("blogs not increase");
  }
});

after(async () => {
  await mongoose.connection.close();
});
