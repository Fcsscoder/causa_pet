const jwt = require("jsonwebtoken");
const getToken = require("../helpers/getToken");

const verifyToken = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "Acesso negado." });
  }

  const token = getToken(req);

  if (!token) {
    return res.status(401).json({ message: "Acesso negado." });
  }

  try {
    jwt.verify(token, process.env.SECRET_KEY);
    next();
  } catch (err) {
    return res.status(400).json({ message: "Token inválido." });
  }
};

module.exports = verifyToken;
