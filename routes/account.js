const express = require("express");
const register = require("../controllers/accounts/register");
const login = require("../controllers/accounts/login");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

module.exports = router;
