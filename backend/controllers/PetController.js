// Model

const Pet = require("../models/Pet");

// Helpers

const validatePetInput = require("../helpers/validations/validatePetInput");
const getToken = require("../helpers/getToken");
const getUserByToken = require("../helpers/getUserByToken");
const ObjectId = require("mongoose").Types.ObjectId;

const fs = require("fs");
const path = require("path");

class PetController {
  static async create(req, res) {
    const { name, age, weight, color } = req.body;

    const images = req.files;

    const error = validatePetInput("create", {
      name,
      age,
      weight,
      color,
      images,
    });

    if (error) {
      return res.status(422).json({ message: error });
    }

    let available = true;

    const token = getToken(req);
    const user = await getUserByToken(token);

    const pet = new Pet({
      name,
      age,
      weight,
      color,
      available,
      images: [],
      user: {
        _id: user._id,
        name: user.name,
        image: user.image,
        phone: user.phone,
      },
    });

    images.map((image) => {
      pet.images.push(image.filename);
    });

    try {
      const newPet = await pet.save();
      res.status(201).json({ message: "Pet cadastrado com sucesso.", newPet });
    } catch (err) {
      res.status(500).json({ message: err });
    }
  }

  static async getAll(req, res) {
    const allPets = await Pet.find().sort("-createdAt");
    res.status(200).json({ pets: allPets });
  }

  static async getAllUserPets(req, res) {
    const token = getToken(req);
    const user = await getUserByToken(token);

    const allUserPets = await Pet.find({ "user._id": user._id }).sort(
      "-createdAt"
    );

    res.status(200).json({ pets: allUserPets });
  }

  static async getAllUserAdoptions(req, res) {
    const token = getToken(req);
    const user = await getUserByToken(token);

    const allUserPets = await Pet.find({ "adopter._id": user._id }).sort(
      "-createdAt"
    );

    res.status(200).json({ pets: allUserPets });
  }

  static async getPetById(req, res) {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.status(422).json({ message: "ObjectId inválido." });
    }

    const pet = await Pet.findById(id);

    if (!pet) {
      return res.status(404).json({ message: "Pet não encontrado." });
    }
    res.status(200).json({ pet: pet });
  }

  static async deletePetById(req, res) {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.status(422).json({ message: "ObjectId inválido." });
    }

    const pet = await Pet.findById(id);

    if (!pet) {
      return res.status(404).json({ message: "Pet não encontrado." });
    }

    const token = getToken(req);
    const user = await getUserByToken(token);

    if (pet.user._id.toString() !== user._id.toString()) {
      return res.status(422).json({
        message:
          "Houve um problema ao processar sua solicitação. Tente novamente mais tarde.",
      });
    }

    await Pet.findByIdAndDelete(id);

    return res.status(200).json({ message: "Pet removido com sucesso!" });
  }

  static async updatePet(req, res) {
    const id = req.params.id;

    const { name, age, weight, color, available } = req.body;

    const images = req.files;

    const pet = req.pet;

    const token = getToken(req);
    const user = await getUserByToken(token);

    if (pet.user._id.toString() !== user._id.toString()) {
      return res.status(422).json({
        message:
          "Houve um problema ao processar sua solicitação. Tente novamente mais tarde.",
      });
    }

    const error = validatePetInput("create", {
      name,
      age,
      weight,
      color,
      images,
    });

    if (error) {
      return res.status(422).json({ message: error });
    }

    const updateData = {
      name,
      age,
      weight,
      color,
      images: [],
    };

    images.map((image) => {
      updateData.images.push(image.filename);
    });

    // Removendo a imagem anterior antes da atualização

    if (pet.images && pet.images.length > 0) {
      pet.images.forEach((imageName) => {
        const imagePath = path.join(
          __dirname,
          "..",
          "public",
          "images",
          "pets",
          imageName
        );

        fs.unlink(imagePath, (err) => {});
      });
    }

    await Pet.findByIdAndUpdate(id, updateData);

    return res.status(201).json({ message: "Pet atualizado com sucesso." });
  }

  static async schedule(req, res) {
    const id = req.params.id;

    const pet = await Pet.findById(id);

    if (!pet) {
      return res.status(404).json({ message: "Pet não encontrado." });
    }

    const token = getToken(req);
    const user = await getUserByToken(token);

    if (pet.user._id.equals(user._id)) {
      return res.status(422).json({
        message: "Você não pode agendar uma visita com o seu próprio pet.",
      });
    }

    if (pet.adopter) {
      if (pet.adopter._id.equals(user._id)) {
        return res.status(422).json({
          message: "Você já agendou uma visita com esse pet.",
        });
      }
    }

    pet.adopter = {
      _id: user._id,
      name: user.name,
      image: user.image,
    };

    await Pet.findByIdAndUpdate(id, pet);

    return res.status(200).json({
      message: `A visita foi agendada com sucesso. Entre em contato com ${user.name} pelo telefone ${user.phone}`,
    });
  }

  static async concludeAdoption(req, res) {
    const id = req.params.id;

    const pet = await Pet.findById(id);

    if (!pet) {
      return res.status(404).json({ message: "Pet não encontrado." });
    }

    const token = getToken(req);
    const user = await getUserByToken(token);

    if (!pet.user._id.equals(user._id)) {
      return res.status(422).json({
        message:
          "Houve um problema ao processar sua solicitação. Tente novamente mais tarde.",
      });
    }

    pet.available = false;

    await Pet.findByIdAndUpdate(id, pet);

    return res
      .status(200)
      .json({ message: "Parabéns! A adoção foi concluída!" });
  }
}

module.exports = PetController;
