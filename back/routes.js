const express = require("express");
const router = express.Router();

const controllers = require("./controllers");

router.post("/login", controllers.Login);
router.get("/public", controllers.Public);
router.get("/private", controllers.Private);

module.exports = router;
