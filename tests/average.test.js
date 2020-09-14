const listHelper = require("../utils/list_helpers");

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

const listWithOneBlog = [
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
];

const emptyBlogList = [];

const listWithMultipleBlogs = [
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "313412e12f23f12",
    title: "Go To Statement Considered Harmful2",
    author: "Edsger W. Dijkstra3",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 20,
    __v: 0,
  },
  {
    _id: "f12r12r244g12f12f12f12f12",
    title: "Go To Statement Considered Harmful3",
    author: "Edsger W. Dijkstra2",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 15,
    __v: 0,
  },
];

describe("total likes", () => {
  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });

  test("when list is empty should return 0", () => {
    const result = listHelper.totalLikes(emptyBlogList);
    expect(result).toBe(0);
  });

  test("when list is empty should return 0", () => {
    const result = listHelper.totalLikes(listWithMultipleBlogs);
    expect(result).toBe(40);
  });
});

describe("Favourite Blog", () => {
  test("When list of blogs is one return that blog", () => {
    const result = listHelper.favoriteBlog(listWithOneBlog);
    expect(result).toEqual(listWithOneBlog[0]);
  });

  test("When list is empty return nothing", () => {
    const result = listHelper.favoriteBlog(emptyBlogList);
    expect(result).toEqual([]);
  });

  test("When multiple items find one with most likes and return that", () => {
    const result = listHelper.favoriteBlog(listWithMultipleBlogs);
    expect(result).toEqual(listWithMultipleBlogs[1]);
  });
});
