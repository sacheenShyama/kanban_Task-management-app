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
    const board = await Board.find({ userId }).populate({
      path: "lists",
      populate: {
        path: "tasks",
      },
    });
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
const deleteBoard = async (req, res) => {
  try {
    const boardId = req.params.id;
    if (!boardId) {
      return res.status(400).json({ message: "details not provided" });
    }
    const board = await Board.findById({ _id: boardId });
    if (!board) {
      return res.status(404).json({ message: "board not found" });
    }

    const lists = await List.find({ boardId });

    const listIds=lists.map((list)=>list._id);
    await Task.deleteMany({listId:{$in:listIds}})

    await List.deleteMany({boardId});
    await Board.findByIdAndDelete({_id:boardId})
    res.status(200).json({message:"Board deleted"})
  } catch (error) {
    res.status(500).json({ message: error, Error: "Error deleting board" });
  }
};

module.exports = { createBoard, getBoard, updateBoard, deleteBoard };
