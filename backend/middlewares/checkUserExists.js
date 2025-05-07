// Helpers

const getToken = require("../helpers/getToken");
const getUserByToken = require("../helpers/getUserByToken");

const checkUserExists = async (req, res, next) => {
  const token = getToken(req);
  const user = await getUserByToken(token);

  if (!user) {
    return res.status(404).json({ message: "Usuário não encontrado." });
  }

  req.user = user;
  next();
};

module.exports = checkUserExists;
