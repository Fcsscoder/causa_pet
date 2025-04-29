const router = require("express").Router();

const UserController = require("../controllers/UserController");

// Middlewares

const verifyToken = require("../middlewares/verifyToken");

// Helpers

const { imageUpload } = require("../helpers/imageUpload");

router.post("/login", UserController.login);
router.post("/register", UserController.register);
router.get("/checkuser", UserController.checkUser);
router.get("/:id", verifyToken, UserController.getUserById);
router.patch(
  "/edit/:id",
  verifyToken,
  imageUpload.single("image"),
  UserController.editUser
);

module.exports = router;
