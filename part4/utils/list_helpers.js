const Blog = require("../models/blog");
const User = require("../models/user");

const initialBlogs = [
  {
    title: "title1",
    author: "author1",
    url: "url",
    likes: 1,
  },
  {
    title: "title2",
    author: "author2",
    url: "url",
    likes: 2,
  },
];

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  let total = 0;
  blogs.forEach((blog) => (total += blog.likes));
  return total;
};

const favoriteBlog = (blogs) => {
  const sortedBlogs = blogs.sort((a, b) =>
    a.likes > b.likes ? -1 : a.likes < b.likes ? 1 : 0,
  );

  return sortedBlogs[0] || null;
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null;

  const authors = [];

  blogs.forEach((blog) => {
    const author = blog.author;
    const authorExists = authors.find((a) => a.author === author);
    if (authorExists) {
      authorExists.blogs += 1;
    } else {
      authors.push({ author, blogs: 1 });
    }
  });

  return authors.sort((a, b) =>
    a.blogs > b.blogs ? -1 : a.blogs < b.blogs ? 1 : 0,
  )[0];
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null;

  const authors = [];

  blogs.forEach((blog) => {
    const author = blog.author;
    const authorExists = authors.find((a) => a.author === author);
    if (authorExists) {
      authorExists.likes += blog.likes;
    } else {
      authors.push({ author, likes: blog.likes });
    }
  });

  return authors.sort((a, b) =>
    a.likes > b.likes ? -1 : a.likes < b.likes ? 1 : 0,
  )[0];
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

module.exports = {
  initialBlogs,
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
  blogsInDb,
  usersInDb,
};
