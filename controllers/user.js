// Models
const Profiles = require("../models/profiles");
const Users = require("../models/users");
const Comments = require("../models/comments");
const {
  validateCreateAccount,
  validateCreateComment,
  validateCreateInteraction,
} = require("../validators/user");
const BaseController = require("./base");

class UserController extends BaseController {
  async createAccount() {
    try {
      await validateCreateAccount(this.req.body);
      const user = await Users.create(this.req.body);
      return this.res.status(200).json({
        message: "User account created successfully",
        user,
      });
    } catch (error) {
      if (!error.code) {
        error.code = 500;
        error.message = "Internal Server Error";
      }
      return this.res.status(error.code).json({ message: error.message });
    }
  }

  async createComment() {
    try {
      await validateCreateComment(this.req.body);
      const { userId, profileId } = this.req.body;
      const user = await Users.findById(userId);
      if (!user) {
        const error = new Error("User not found");
        error.code = 404;
        throw error;
      }

      const profile = await Profiles.findById(profileId);
      if (!profile) {
        const error = new Error("Profile not found");
        error.code = 404;
        throw error;
      }
      const comment = await Comments.create(this.req.body);
      return this.res.status(200).json({
        message: "Comment created successfully",
        comment,
      });
    } catch (error) {
      if (!error.code) {
        error.code = 500;
        error.message = "Internal Server Error";
      }
      return this.res.status(error.code).json({ message: error.message });
    }
  }

  async createInteraction() {
    try {
      await validateCreateInteraction(this.req.body);
      const { userId, commentId, like } = this.req.body;
      const user = await Users.findById(userId);
      if (!user) {
        const error = new Error("User not found");
        error.code = 404;
        throw error;
      }

      const comment = await Comments.findById(commentId);
      if (!comment) {
        const error = new Error("Comment not found");
        error.code = 404;
        throw error;
      }
      if (like) {
        await Comments.findByIdAndUpdate(
          commentId,
          { $addToSet: { likes: userId } },
          { new: true }
        );
      } else {
        await Comments.findByIdAndUpdate(
          commentId,
          { $pull: { likes: userId } },
          { new: true }
        );
      }

      return this.res.status(200).json({
        message: `Comment has been ${
          like ? "liked" : "unliked"
        } created successfully`,
      });
    } catch (error) {
      if (!error.code) {
        error.code = 500;
        error.message = "Internal Server Error";
      }
      return this.res.status(error.code).json({ message: error.message });
    }
  }
}

module.exports = UserController;
