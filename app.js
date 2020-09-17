const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./utils/config");

const mongoUrl = config.MONGODB_URI;
if (process.env.NODE_ENV === "test") {
  MONGODB_URI = process.env.TEST_MONGODB_URI;
}

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(express.json());

const blogRouter = require("./controllers/blogs");
const userRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
app.use("/api/blogs", blogRouter);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);

module.exports = app;
