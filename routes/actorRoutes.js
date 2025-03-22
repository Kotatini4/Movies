const express = require("express");
const router = express.Router();
const actorController = require("../controllers/actorController");
const auth = require("../middleware/authMiddleware");

router.get("/actor/count", actorController.getActorCount);
router.get("/actor/search/:name", actorController.searchActorsByName);
router.get("/actor", actorController.getAllActors);
router.post("/actor", auth, actorController.createActor);
router.get("/actor/:id", actorController.getActorById);
router.put("/actor/:id", auth, actorController.updateActor);
router.delete("/actor/:id", auth, actorController.deleteActor);

module.exports = router;
