const express = require("express");
const Router = express.Router();
const {
  createPostController,
  allPostController,
  onePostController,
  onePostUpdateController,
} = require("../controllers/controllers");

Router.get("/allposts", allPostController);
Router.get("/allposts/:id", onePostController);
Router.patch("/allposts/:id", onePostUpdateController);
Router.post("/createpost", createPostController);

module.exports = Router;
