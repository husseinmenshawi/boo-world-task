const yup = require("yup");
async function validateCreateProfile(profile) {
  const profileSchema = yup.object().shape({
    name: yup.string().required(),
    description: yup.string().required(),
    mbti: yup.string().required(),
    enneagram: yup.string().required(),
    variant: yup.string().required(),
    tritype: yup.number(),
    socionics: yup.string().required(),
    sloan: yup.string().required(),
    psyche: yup.string().required(),
    image: yup.string().required(),
  });

  try {
    await profileSchema.validate(profile);
    return;
  } catch (error) {
    const handledError = new Error(error.message);
    handledError.code = 400;
    throw handledError;
  }
}

async function validateGetProfileComments(profile) {
  const profileSchema = yup.object().shape({
    sort: yup.string().lowercase().oneOf(["best", "recent"]).required(),
    filter: yup
      .string()
      .lowercase()
      .oneOf(["mbti", "enneagram", "zodiac"])
      .optional(),
  });

  try {
    await profileSchema.validate(profile);
    return;
  } catch (error) {
    const handledError = new Error(error.message);
    handledError.code = 400;
    throw handledError;
  }
}

module.exports = {
  validateCreateProfile,
  validateGetProfileComments,
};
