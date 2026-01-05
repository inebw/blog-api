const { Router } = require("express");
const logout = require("../controllers/logout");

const router = Router();

router.post("/", logout);

module.exports = router;
