const mongoose = require("mongoose");
const Board = require("../models/boardModel");
const List = require("../models/listModel");
const Task = require("../models/taskModel");

const createList = async (req, res) => {
  try {
    const { title, boardId } = req.body;
    if (!title || !boardId) {
      return res
        .status(400)
        .json({ message: "Title and boardId are required" });
    }

    const board = await Board.findById(boardId);
    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }

    const list = new List({
      title,
      boardId,
    });
    await list.save();
    board.lists.push(list);
    await board.save();

    res.status(201).json({ message: "List created", list });
  } catch (error) {
    res.status(500).json({ message: error.message || "Error creating list" });
  }
};

const updateList = async (req, res) => {
  try {
    const { title } = req.body;
    const id = req.params.id;
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const list = await List.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        title,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }
    res.status(200).json({ message: "List updated", list });
  } catch (error) {
    res.status(500).json({ message: error.message || "Error updating list" });
  }
};

const deleteList = async (req, res) => {
  try {
    const id = req.params.id;

    const list = await List.findByIdAndDelete({ _id: id });
    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }
    await Task.deleteMany({ listId: id });
    res.status(200).json({ message: "List deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message || "Error deleting list" });
  }
};

module.exports = { createList, updateList, deleteList };
