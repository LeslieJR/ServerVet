const { Router } = require("express");

const router = Router();

const controller = require('../controllers')

//TO CREATE A DOG FOR A CLIENT
router.post("/dog/:id", controller.dogs.createDog);

//TO GET A DOG
router.get("/dog/:clientid/:id", controller.dogs.getDog);

//TO UPDATE A DOG
router.put("/update/:clientid/:id", controller.dogs.updateDog);

//TO DELETE A DOG
router.delete("/delete/:clientid/:id", controller.dogs.deleteDog);

//TO GET A LIST OF DOGS
router.get("/dogs/:clientid", controller.dogs.getDogs);

module.exports = router;
