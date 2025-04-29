const User = require("../models/User");

const checkUserExists = async (req, res, next) => {
  id = req.params.id;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    req.user = user;

    next();
  } catch (err) {
    return res.status(500).json({ message: "Erro no servidor." });
  }
};

module.exports = checkUserExists;
