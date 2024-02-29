const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    zodiac: String,
    mbti: String,
    enneagram: String,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Comments", commentSchema);
