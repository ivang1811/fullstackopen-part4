const blogRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const Blog = require("../models/blog");
const User = require("../models/user");

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  }
  return null;
};

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs.map((blog) => blog.toJSON()));
});

blogRouter.post("/", async (request, response) => {
  const token = getTokenFrom(request);
  console.log(token);

  if (!token) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  if (!request.body.title || !request.body.url) {
    return response.status(400).json({
      error: "content missing",
    });
  }
  const user = await User.findById(decodedToken.id);

  const blog = new Blog({
    title: request.body.title,
    Author: request.body.author,
    url: request.body.url,
    likes: request.body.likes || 0,
    user: user._id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.json(savedBlog);
});

blogRouter.delete("/:id", async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } catch (exception) {
    next(exception);
  }
});

blogRouter.put("/:id", async (request, response, next) => {
  const body = request.body;

  const blog = {
    title: body.title,
    Author: body.author,
    url: body.url,
    likes: body.likes,
  };

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
      new: true,
      runValidators: true,
      context: "query",
    });
    response.json(updatedBlog);
  } catch (exception) {
    next(exception);
  }
});

module.exports = blogRouter;
