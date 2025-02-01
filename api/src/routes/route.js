const express = require("express");
const { register, login } = require("../controllers/userController");
const authenticateUser = require("../middleware/authMiddleware");
const {
  createBoard,
  getBoard,
  updateBoard,
} = require("../controllers/boardController");
const { createList, updateList } = require("../controllers/listControllers");
const {
  createTask,
  updateTask,
  deleteTask,
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
router.put("/list", authenticateUser, updateList);

//below route is for task
router.post("/task", authenticateUser, createTask);
router.put("/task", authenticateUser, updateTask);
router.delete("/task/:id", authenticateUser, deleteTask);

module.exports = router;
