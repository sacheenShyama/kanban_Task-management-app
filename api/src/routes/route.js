const express = require("express");
const { register, login } = require("../controllers/userController");
const authenticateUser = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/get", (req, res) => {
  res.send("hello");
});
router.get("/protect", authenticateUser, (req, res) => {
  res.send("protected");
});

module.exports = router;
