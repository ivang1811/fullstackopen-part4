const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  let total = 0;
  blogs.forEach((item) => {
    total += item.likes;
  });
  return total;
};

const favoriteBlog = (blogs) => {
  let favBlog;
  if (blogs.length > 1) {
    favBlog = blogs.reduce((fav, blog) =>
      fav.likes > blog.likes ? fav : blog
    );
  } else if (blogs.length == 1) {
    return blogs[0];
  } else {
    favBlog = [];
  }

  return favBlog;
};

const mostBlogs = (blogs) => {
  
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
