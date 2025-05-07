const router = require("express").Router();

const UserController = require("../controllers/UserController");

// Middlewares

const verifyToken = require("../middlewares/verifyToken");

// Helpers

const { imageUpload } = require("../helpers/imageUpload");

router.post("/login", UserController.login);
router.post("/register", UserController.register);

router.get("/me", UserController.checkUser);
router.get("/:id", verifyToken, UserController.getUserById);

router.patch("/me", verifyToken, UserController.editUser);

router.patch(
  "/me/profile-image",
  verifyToken,
  imageUpload.single("image"),
  UserController.editUserImage
);
module.exports = router;
