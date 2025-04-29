const jwt = require("jsonwebtoken");
const User = require("../models/User");

const getUserByToken = async (token) => {
  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  const user = await User.findById(decoded.id);
  return user;
};

module.exports = getUserByToken;
