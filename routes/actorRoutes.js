const express = require("express");
const router = express.Router();
const actorController = require("../controllers/actorController");

router.get("/actor/count", actorController.getActorCount);
router.get("/actor/search/:name", actorController.searchActorsByName);
router.get("/actor", actorController.getAllActors);
router.post("/actor", actorController.createActor);
router.get("/actor/:id", actorController.getActorById);
router.put("/actor/:id", actorController.updateActor);
router.delete("/actor/:id", actorController.deleteActor);

module.exports = router;
