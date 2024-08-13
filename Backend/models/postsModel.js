const { Schema, model } = require("mongoose");

const createPostSchema = new Schema(
  {
    postText: {
      type: String,
      required: true,
    },
    socialHandle: {
      type: String,
      required: true,
    },
    postVotes: {
      likes: {
        type: Number,
        default: 0,
      },
      liked: {
        type: Boolean,
        default: false,
      },
      disliked: {
        type: Boolean,
        default: false,
      },
    },
  },
  { timestamps: true }
);

const createPostModel = new model("Post", createPostSchema);

module.exports = createPostModel;
