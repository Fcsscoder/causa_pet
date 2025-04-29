const Pet = require("../models/Pet");

const checkPetExists = async (req, res, next) => {
  id = req.params.id;

  try {
    const pet = await Pet.findById(id);

    if (!pet) {
      return res.status(404).json({ message: "Pet não encontrado." });
    }

    req.pet = pet;

    next();
  } catch (err) {
    return res.status(500).json({ message: "Erro no servidor." });
  }
};

module.exports = checkPetExists;
