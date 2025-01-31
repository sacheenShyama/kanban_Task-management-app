const { default: mongoose } = require("mongoose");
const Board = require("../models/boardModel");
const List = require("../models/listModel");
const Task = require("../models/taskModel");

const createBoard = async (req, res) => {
  try {
    const { title } = req.body;
    const userId = req.user.id;
    if (!title || !userId) {
      return res.status(401).json({ message: "details missing" });
    }

    const board = new Board({ title, userId });
    await board.save();
    res.status(200).json(board);
  } catch (error) {
    res.status(500).json({ message: error, Error: "Error creating board" });
  }
};

const getBoard = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      return res.status(404).json({ message: "unauthorized access" });
    }
    const board = await Board.find({ userId });
    res.status(200).json(board);
  } catch (error) {
    res.status(500).json({ message: error, Error: "Error fetching board" });
  }
};

const updateBoard = async (req, res) => {
  try {
    const { boardId, title } = req.body;
    const userId = req.user.id;

    if (!boardId || !title) {
      return res.status(401).json({ message: "board&title id no found" });
    }

    const board = await Board.findOneAndUpdate(
      {
        _id: boardId,
        userId,
      },
      {
        title,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!board) {
      return res
        .status(404)
        .json({ message: "Board not found or unauthorized" });
    }

    res.status(200).json({ message: "Board updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error, Error: "Error updating board" });
  }
};

module.exports = { createBoard, getBoard, updateBoard };
