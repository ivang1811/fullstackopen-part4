const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("Blog", { title: 1, Author: 1 });
  response.json(users.map((u) => u.toJSON()));
});

usersRouter.post("/", async (request, response) => {
  const body = request.body;

  if (!body.password || !body.username) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  if (body.password.length < 3 || body.username.length < 3) {
    return response.status(400).json({
      error: "Username or password are not long enough 3 characters required",
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  });
  try {
    const savedUser = await user.save();
    response.json(savedUser);
  } catch (exception) {
    next(exception);
  }
});

module.exports = usersRouter;
