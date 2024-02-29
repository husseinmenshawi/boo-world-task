// Models
const Profile = require("../models/profiles");
const Comments = require("../models/comments");

const {
  validateCreateProfile,
  validateGetProfileComments,
} = require("../validators/profile");
const BaseController = require("./base");

class ProfileController extends BaseController {
  async createProfile() {
    try {
      await validateCreateProfile(this.req.body);
      const profile = await Profile.create(this.req.body);
      return this.res.status(200).json({
        message: "Profile created successfully",
        profile,
      });
    } catch (error) {
      if (!error.code) {
        error.code = 500;
        error.message = "Internal Server Error";
      }
      return this.res.status(error.code).json({ message: error.message });
    }
  }

  async getProfileById() {
    try {
      const profileId = this.req.params.id;
      const profile = await Profile.findById(profileId);

      if (!profile) {
        const error = new Error("Profile not found");
        error.code = 404;
        throw error;
      }

      return this.res
        .json({
          message: "Profile fetched successfully",
          profile,
        })
        .status(200);
    } catch (error) {
      if (!error.code) {
        error.code = 500;
        error.message = "Internal Server Error";
      }
      return this.res.status(error.code).json({ message: error.message });
    }
  }

  async getProfileForRender() {
    try {
      const profileId = this.req.params.id;
      const profile = await Profile.findById(profileId);
      if (!profile) {
        const error = new Error("Profile not found");
        error.code = 400;
        throw error;
      }
      return profile;
    } catch (error) {
      if (!error.code) {
        error.code = 500;
        error.message = "Internal Server Error";
      }
      return this.res.status(error.code).json({ message: error.message });
    }
  }

  async getProfileComments() {
    try {
      await validateGetProfileComments(this.req.query);
      const { sort, filter } = this.req.query;
      const comments = await Comments.aggregate([
        {
          $project: {
            _id: 1,
            title: 1,
            description: 1,
            enneagram: 1,
            zodiac: 1,
            mbti: 1,
            userId: 1,
            likesCount: { $size: "$likes" },
            createdAt: 1,
          },
        },
        {
          ...(sort && sort === "best"
            ? { $sort: { likesCount: -1 } }
            : { $sort: { createdAt: -1 } }),
        },
      ]);
      return this.res
        .json({
          message: "Profile fetched successfully",
          comments,
        })
        .status(200);
    } catch (error) {
      if (!error.code) {
        error.code = 500;
        error.message = "Internal Server Error";
      }
      return this.res.status(error.code).json({ message: error.message });
    }
  }
}

module.exports = ProfileController;
