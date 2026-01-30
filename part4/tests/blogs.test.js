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

test("add a blog and check if blog list increases", async () => {
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
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await Blog.find({});

  if (blogsAtEnd.length !== initialLength + 1) {
    throw new Error("blogs not increase");
  }
});

test("if likes property is missing, it defaults to 0", async () => {
  const blogsAtStart = await Blog.find({});

  const newBlog = {
    title: "title no likes",
    author: "authornolikes",
    url: "url",
  };

  const response = await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  if (response.body.likes !== 0) {
    throw new Error("likes is not 0 by default");
  }

  const blogsAtEnd = await Blog.find({});
  if (blogsAtEnd.length !== blogsAtStart.length + 1) {
    throw new Error("Number of blogs did not increase");
  }
});

test("blog without title or url is not added", async () => {
  const blogsAtStart = await Blog.find({});

  const newBlogNoTitle = {
    author: "author anon",
    url: "url",
    likes: 2,
  };

  await api.post("/api/blogs").send(newBlogNoTitle).expect(400);

  const newBlogNoUrl = {
    title: "no url",
    author: "author anon",
    likes: 2,
  };

  await api.post("/api/blogs").send(newBlogNoUrl).expect(400);

  const blogsAtEnd = await Blog.find({});
  if (blogsAtEnd.length !== blogsAtStart.length) {
    throw new Error("Blog without title or url not be added");
  }
});

after(async () => {
  await mongoose.connection.close();
});
