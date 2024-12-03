const jwt = require("jsonwebtoken");

const generateToken = (payload) => {
  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_KEY, {
    expiresIn: "1d",
  });
  const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_KEY, {
    expiresIn: "30d",
  });

  return { accessToken, refreshToken };
};

module.exports = generateToken;
