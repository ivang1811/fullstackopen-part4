const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "HTML is easy",
    Author: "Bob Marly",
    url: "www.website.com",
    likes: 5,
  },
  {
    title: "JS and CSS",
    Author: "Jim Marly",
    url: "www.websites.com",
    likes: 15,
  },
  {
    title: "JS and HTML",
    Author: "Jim Marly",
    url: "www.we31sites.com",
    likes: 55,
  },
  {
    title: "Heroes",
    Author: "ivan Golem",
    url: "www.Kozaa.com",
    likes: 10,
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  blogsInDb,
  initialBlogs,
};
