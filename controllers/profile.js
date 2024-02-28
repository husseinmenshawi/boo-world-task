// Models
const Profile = require("../models/profiles");
const { validateCreateProfile } = require("../validators/profile");

class ProfileController {
  constructor(req, res, next) {
    this.req = req;
    this.res = res;
    this.next = next;
  }
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
        error.code = 400;
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
}

module.exports = ProfileController;
