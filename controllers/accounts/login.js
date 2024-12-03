const User = require("../../models/User");
const bcrypt = require("bcrypt");
const generateToken = require("../../utils/generateToken");

const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const formattedEmail = email.toLowerCase();

    const foundUser = await User.findOne({ email: formattedEmail });
    if (!foundUser) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    const isPasswordMatch = await bcrypt.compare(password, foundUser.password);
    if (!isPasswordMatch) {
      const error = new Error("Invalid password");
      error.statusCode = 400;
      throw error;
    }

    const payload = {
      role: foundUser.role,
      id: foundUser._id,
      email: foundUser.email,
    };
    const { accessToken, refreshToken } = generateToken(payload);

    if (!accessToken || !refreshToken) {
      const error = new Error("Token generation failed");
      error.statusCode = 500;
      throw error;
    }

    res.cookie("accessToken", accessToken);
    res.cookie("refreshToken", refreshToken);

    res.status(200).json({
      message: "Login success",
      status: true,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = login;
