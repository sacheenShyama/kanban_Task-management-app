const express = require("express");
const { register, login } = require("../controllers/userController");
const authenticateUser = require("../middleware/authMiddleware");
const {
  createBoard,
  getBoard,
  updateBoard,
} = require("../controllers/boardController");
const {
  createList,
  getList,
  updateList,
} = require("../controllers/listControllers");
const {
  createTask,
  getTask,
  updateTask,
} = require("../controllers/taskControllers");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);

//below router is for boards
router.post("/board", authenticateUser, createBoard);
router.get("/board", authenticateUser, getBoard);
router.put("/board", authenticateUser, updateBoard);

//below router is for list
router.post("/list", authenticateUser, createList);
router.get("/list", authenticateUser, getList);
router.put("/list", authenticateUser, updateList);

//below route is for task
router.post("/task", authenticateUser, createTask);
router.get("/task", authenticateUser, getTask);
router.put("/task", authenticateUser, updateTask);

module.exports = router;
