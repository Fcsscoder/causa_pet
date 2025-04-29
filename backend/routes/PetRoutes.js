const router = require("express").Router();

const PetController = require("../controllers/PetController");

// Middlewares

const verifyToken = require("../middlewares/verifyToken");
const checkPetExists = require("../middlewares/checkPetExists");

// Helpers

const { imageUpload } = require("../helpers/imageUpload");

router.post(
  "/criar",
  verifyToken,
  imageUpload.array("images"),
  PetController.create
);

router.get("/", PetController.getAll);
router.get("/:id", PetController.getPetById);
router.get("/mypets", verifyToken, PetController.getAllUserPets);
router.get("/myadoptions", verifyToken, PetController.getAllUserAdoptions);
router.get("/concludeadoption", verifyToken, PetController.concludeAdoption);

router.delete("/:id", verifyToken, PetController.deletePetById);

router.patch(
  "/:id",
  verifyToken,
  checkPetExists,
  imageUpload.array("images"),
  PetController.updatePet
);
router.patch("/schedule/:id", verifyToken, PetController.schedule);

module.exports = router;
