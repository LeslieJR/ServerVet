const { Router } = require("express");
const router = Router();

const controller = require('../controller')

//CREATE CLIENT [POST]
router.post("/create", controller.clients.create );

//UPDATE CLIENT [PUT]
router.put("/update/:id", controller.clients.update);

//READ A CLIENT [GET]
router.get("/client/:id", controller.clients.getOne);

//DELETE A CLIENT [GET]
router.delete("/delete/:id", controller.clients.remove);

//READ ALL CLIENT [GET]
router.get("/clients", controller.clients.getAll);

module.exports = router;
