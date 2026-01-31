const { describe, test, after } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const listHelper = require("../utils/list_helpers");

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
  const blogsAtStart = await listHelper.blogsInDb();
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

  const blogsAtEnd = await listHelper.blogsInDb();

  if (blogsAtEnd.length !== initialLength + 1) {
    throw new Error("blogs not increase");
  }
});

test("if likes property is missing, it defaults to 0", async () => {
  const blogsAtStart = await listHelper.blogsInDb();

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

  const blogsAtEnd = await listHelper.blogsInDb();
  if (blogsAtEnd.length !== blogsAtStart.length + 1) {
    throw new Error("Number of blogs did not increase");
  }
});

test("blog without title or url is not added", async () => {
  const blogsAtStart = await listHelper.blogsInDb();

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

  const blogsAtEnd = await listHelper.blogsInDb();
  if (blogsAtEnd.length !== blogsAtStart.length) {
    throw new Error("Blog without title or url not be added");
  }
});

describe("deletion of a blog", () => {
  test("succeeds with status code 204 if id is valid", async () => {
    const blogsAtStart = await listHelper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await listHelper.blogsInDb();

    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1);
  });
});

describe("update blog", () => {
  test("update likes on a blog", async () => {
    const blogsAtStart = await listHelper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];

    const updatedData = {
      title: blogToUpdate.title,
      author: blogToUpdate.author,
      url: blogToUpdate.url,
      likes: blogToUpdate.likes + 1,
    };

    const response = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedData)
      .expect(202)
      .expect("Content-Type", /application\/json/);

    if (response.body.likes !== blogToUpdate.likes + 1) {
      throw new Error("Likes were not updated correctly");
    }

    const blogsAtEnd = await listHelper.blogsInDb();

    const updatedBlog = blogsAtEnd.find((b) => b.id === blogToUpdate.id);

    if (updatedBlog.likes !== blogToUpdate.likes + 1) {
      throw new Error("Likes in DB were not updated correctly");
    }
  });
});

after(async () => {
  await mongoose.connection.close();
});
