const User = require("../models/User");

// Módulos

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");

// Helpers

const createUserToken = require("../helpers/createUserToken");
const validateUserInput = require("../helpers/validations/validateUserInput");
const getToken = require("../helpers/getToken");
const getUserByToken = require("../helpers/getUserByToken");

module.exports = class UserController {
  static async register(req, res) {
    const { name, email, password, confirmpassword, phone } = req.body;

    // Verificando se todas as informações foram enviadas

    const error = validateUserInput("register", {
      name,
      email,
      password,
      confirmpassword,
      phone,
    });

    if (error) {
      return res.status(422).json({ message: error });
    }

    // Verificando se o email enviado existe

    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res
        .status(422)
        .json({ message: "Email já cadastrado. Tente novamente." });
    }

    // Criando o hash

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      password: passwordHash,
      phone,
    });

    try {
      const newUser = await user.save();
      createUserToken(newUser, req, res);
    } catch (error) {
      res.status(500).json({ message: `Erro: ${error}` });
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;

    const error = validateUserInput("login", { email, password });

    if (error) {
      return res.status(422).json({ message: error });
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      res.status(422).json({ message: "Usuário não encontrado." });
      return;
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      res.status(422).json({ message: "Senha incorreta." });
      return;
    }

    await createUserToken(user, req, res);
  }

  static async checkUser(req, res) {
    let currentUser;

    if (req.headers.authorization) {
      const token = getToken(req);
      const decoded = jwt.decode(token, process.env.SECRET_KEY);

      currentUser = await User.findById(decoded.id);

      currentUser.password = undefined;
    } else {
      currentUser = null;
    }

    return res.status(200).send(currentUser);
  }

  static async getUserById(req, res) {
    const id = req.params.id;

    // select() seleciona, adicionando o hifen antes do que eu não quero que retorne

    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(422).json({ message: "Usuário não encontrado." });
    }

    return res.status(200).json({ user });
  }

  static async editUser(req, res) {
    const { name, email, password, confirmpassword, phone } = req.body;

    const token = getToken(req);
    const user = await getUserByToken(token);

    if (!user) {
      return res.status(422).json({ message: "Usuário não encontrado." });
    }

    if (user.image) {
      const imagePath = path.join(
        __dirname,
        "..",
        "public",
        "images",
        "users",
        user.image
      );

      fs.unlink(imagePath, (err) => {});
    }

    if (req.file) {
      user.image = req.file.filename;
    }

    const error = validateUserInput("edit", {
      name,
      email,
      phone,
    });

    if (error) {
      return res.status(422).json({ message: error });
    }

    user.phone = phone;
    user.email = email;
    user.name = name;

    const userExist = await User.findOne({ email: email });

    if (user.email !== email && userExist) {
      return res.status(422).json({ message: "Email já cadastrado." });
    }

    if (password != confirmpassword) {
      return res.status(422).json({ message: "As senhas não conferem." });
    } else if (password === confirmpassword && password != null) {
      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash(password, salt);

      user.password = passwordHash;
    }

    try {
      await User.findOneAndUpdate(
        { _id: user._id },
        { $set: user },
        { new: true }
      );

      res.status(200).json({ message: "Usuário atualizado com sucesso." });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }
};
