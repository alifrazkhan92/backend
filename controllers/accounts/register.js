const User = require("../../models/User");
const bcrypt = require("bcrypt");
const joi = require("joi");

const register = async (req, res, next) => {
  const { error: validationError } = validateUser(req.body);
  const { name, email, password } = req.body;

  try {
    if (validationError) {
      const error = new Error(validationError.details[0].message);
      error.statusCode = 400;
      throw error;
    }

    const formattedName = name.toLowerCase();
    const formattedEmail = email.toLowerCase();

    const findedUser = await User.findOne({ email: formattedEmail });
    if (findedUser) {
      const error = new Error("User already exists");
      error.statusCode = 400;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name: formattedName,
      email: formattedEmail,
      password: hashedPassword,
    });

    await newUser.save();
    res
      .status(200)
      .json({ message: "User created successfully", status: true });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ message: error.message, status: false });
  }
};

module.exports = register;

function validateUser(data) {
  const userSchema = joi.object({
    name: joi.string().min(2).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
  });

  return userSchema.validate(data);
}
