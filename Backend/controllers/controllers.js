const createPostModel = require("../models/postsModel");

const createPostController = async (req, res) => {
  try {
    const { postText, socialHandle } = req.body;

    if (!postText || !socialHandle) {
      res.status(500).json({ message: "Fill all the inputs" });
    } else {
      const post = await createPostModel.create({
        postText,
        socialHandle,
      });
      return res.status(200).json({
        message: "Post created successfully",
        post: post,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const allPostController = async (req, res) => {
  try {
    const posts = await createPostModel.find();
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ messgage: error.message });
  }
};

const onePostController = async (req, res) => {
  try {
    const getID = req.params.id;
    const getData = await createPostModel.findById(getID);

    if (!getData) {
      return res.status(404).json({ message: "Post not found" });
    }

    return res.status(200).json(getData);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const onePostUpdateController = async (req, res) => {
  try {
    const getID = req.params.id;
    const getData = req.body;
    const updatedData = await createPostModel.findByIdAndUpdate(
      getID,
      getData,
      { new: true }
    );

    if (!updatedData) {
      return res.status(400).json({ message: "Post not found" });
    }

    return res.status(200).json({ message: "updated", data: updatedData });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPostController,
  allPostController,
  onePostController,
  onePostUpdateController,
};
