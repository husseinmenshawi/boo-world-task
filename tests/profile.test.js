const {
  badMockProfile,
  goodMockProfile,
  profiles,
} = require("../sample/profile");
const { validateCreateProfile } = require("../validators/profile");

describe("Create Profile", () => {
  it("Success", async () => {
    let isValidated;
    try {
      await validateCreateProfile(goodMockProfile);
      isValidated = true;
    } catch (error) {
      isValidated = false;
    }
    expect(isValidated).toBe(true);
  });

  it("Failed", async () => {
    let isValidated;
    try {
      await validateCreateProfile(badMockProfile);
      isValidated = true;
    } catch (error) {
      isValidated = false;
    }
    expect(isValidated).toBe(false);
  });
});

describe("Fetch Profile", () => {
  it("Success", () => {
    const profileId = 1;
    const profile = profiles.find((profile) => profile.id === profileId);
    expect(profile).toBeTruthy();
  });

  it("Failed", () => {
    const profileId = 2;
    const profile = profiles.find((profile) => profile.id === profileId);
    expect(profile).toBe(undefined);
  });
});
