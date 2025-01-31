const express = require("express");
const { register, login } = require("../controllers/userController");
const authenticateUser = require("../middleware/authMiddleware");
const { createBoard, getBoard } = require("../controllers/boardController");
const { createList, getList } = require("../controllers/listControllers");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);

//below router is for boards
router.post("/board", authenticateUser, createBoard);
router.get("/board", authenticateUser, getBoard);

//below router is for list
router.post("/list", authenticateUser, createList);
router.get("/list", authenticateUser, getList);

module.exports = router;
