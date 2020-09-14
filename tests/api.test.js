const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const helper = require("./test_helpers");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  let blogObject = new Blog(helper.initialBlogs[0]);
  await blogObject.save();

  blogObject = new Blog(helper.initialBlogs[1]);
  await blogObject.save();

  blogObject = new Blog(helper.initialBlogs[2]);
  await blogObject.save();

  blogObject = new Blog(helper.initialBlogs[3]);
  await blogObject.save();
});

test("The Correct Number of Blogs  are returned", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test("Check that id is in the blogs", async () => {
  const response = await api.get("/api/blogs");

  const contents = response.body;
  console.log(contents);

  expect(contents[0].id).toBeDefined();
});

test("Can add a blog psot", async () => {
  const newBlog = {
    title: "TEST",
    Author: "ivan Golem",
    url: "www.31.com",
    likes: 0,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
});

test("Check that id is in the blogs", async () => {
  const response = await api.get("/api/blogs");

  const contents = response.body;
  console.log(contents);

  expect(contents[0].id).toBeDefined();
});

test("Can add a blog psot", async () => {
  const newBlog = {
    title: "TEST",
    Author: "ivan Golem",
    url: "www.31.com",
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

  const contents = blogsAtEnd.map((b) => b.likes);

  expect(contents).toContain(0);
});

test("blogs without required contents", async () => {
  const newBlog = {
    Author: "Bob",
  };

  await api.post("/api/blogs").send(newBlog).expect(400);

  const blogsAtEnd = await helper.blogsInDb();

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
});

afterAll(() => {
  mongoose.connection.close();
});
