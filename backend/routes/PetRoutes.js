const router = require("express").Router();

const PetController = require("../controllers/PetController");

// Middlewares

const verifyToken = require("../middlewares/verifyToken");
const checkPetExists = require("../middlewares/checkPetExists");

// Helpers

const { imageUpload } = require("../helpers/imageUpload");

router.post(
  "/",
  verifyToken,
  imageUpload.array("images"),
  PetController.create
);

router.get("/", PetController.getAll);
router.get("/:id", PetController.getPetById);
router.get("/me", verifyToken, PetController.getAllUserPets);
router.get("/me/adoptions", verifyToken, PetController.getAllUserAdoptions);

router.patch(
  "/:id",
  verifyToken,
  checkPetExists,
  imageUpload.array("images"),
  PetController.updatePet
);
router.patch("/schedule/:id", verifyToken, PetController.schedule);
router.patch("/:id/conclude", verifyToken, PetController.concludeAdoption);

router.delete("/:id", verifyToken, PetController.deletePetById);

module.exports = router;
