const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    title: 1,
    author: 1,
    url: 1,
    likes: 1,
  });

  response.json(users);
});

usersRouter.get("/:id", async (request, response) => {
  const id = request.params.id;

  try {
    const user = await User.findById(id);
    if (user) {
      response.json(user);
    } else {
      response.status(404).end();
    }
  } catch (error) {
    response.status(400).json({ error: "malformatted id" });
  }
});

usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  if (password.length < 3) {
    return response.status(400).json({ error: "password too short" });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

usersRouter.delete("/:id", async (request, response) => {
  const id = request.params.id;
  await User.findByIdAndDelete(id);
  response.status(204).end();
});

usersRouter.put("/:id", async (request, response) => {
  const id = request.params.id;
  const { title, author, url, likes } = request.body;

  if (!title) {
    response.status(400).json({ error: "title is required" });
    return;
  }

  if (!url) {
    response.status(400).json({ error: "url is required" });
    return;
  }

  const user = { title, author, url, likes };

  const updatedUser = await User.findByIdAndUpdate(id, user, {
    new: true,
    runValidators: true,
  });

  response.status(202).json(updatedUser);
});

module.exports = usersRouter;
