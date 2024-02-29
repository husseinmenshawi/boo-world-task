const yup = require("yup");

async function validateCreateAccount(data) {
  const userSchema = yup.object().shape({
    name: yup.string().required(),
  });

  try {
    await userSchema.validate(data);
    return;
  } catch (error) {
    const handledError = new Error(error.message);
    handledError.code = 400;
    throw handledError;
  }
}

async function validateCreateComment(data) {
  const commentSchema = yup.object().shape({
    profileId: yup.string().required(),
    userId: yup.string().required(),
    title: yup.string().required(),
    description: yup.string().required(),
    mbti: yup
      .string()
      .lowercase()
      .oneOf([
        "infp",
        "infj",
        "enfp",
        "enfj",
        "intj",
        "intp",
        "entp",
        "entj",
        "isfp",
        "isfj",
        "esfp",
        "esfj",
        "istp",
        "istj",
        "estp",
        "estj",
      ])
      .optional(),
    enneagram: yup
      .string()
      .lowercase()
      .oneOf([
        "1w2",
        "2w3",
        "3w2",
        "3w4",
        "4w3",
        "4w5",
        "5w4",
        "5w6",
        "6w5",
        "6w7",
        "7w6",
        "7w8",
        "8w7",
        "8w9",
        "9w8",
        "9w1",
      ])
      .optional(),
    zodiac: yup
      .string()
      .lowercase()
      .oneOf([
        "aries",
        "taurus",
        "gemini",
        "cancer",
        "leo",
        "virgo",
        "libra",
        "scorpio",
        "sagittarius",
        "capricorn",
        "aquarius",
        "pisces",
      ])
      .optional(),
  });

  try {
    await commentSchema.validate(data);
    return;
  } catch (error) {
    const handledError = new Error(error.message);
    handledError.code = 400;
    throw handledError;
  }
}

async function validateCreateInteraction(data) {
  const interactionSchema = yup.object().shape({
    userId: yup.string().required(),
    commentId: yup.string().required(),
    like: yup.boolean().required(),
  });

  try {
    await interactionSchema.validate(data);
    return;
  } catch (error) {
    const handledError = new Error(error.message);
    handledError.code = 400;
    throw handledError;
  }
}

module.exports = {
  validateCreateAccount,
  validateCreateComment,
  validateCreateInteraction,
};
