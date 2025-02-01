const { default: mongoose } = require("mongoose");
const Board = require("../models/boardModel");
const List = require("../models/listModel");
const Task = require("../models/taskModel");

const createList = async (req, res) => {
  try {
    const { title, boardId } = req.body;
    if (!title || !boardId) {
      return res.status(400).json({ message: "title and boardId not found" });
    }

    const board = await Board.findById(boardId);
    if (!board) {
      return res.status(400).json({ message: "board not found" });
    }

    const list = new List({
      title,
      boardId,
    });
    await list.save();
    board.lists.push(list);
    await board.save();

    res.status(200).json({ message: "list created" });
  } catch (error) {
    res.status(500).json({ message: error, Error: "Error creating list" });
  }
};

const updateList = async (req, res) => {
  try {
    const { title, listId } = req.body;

    if (!title || !listId) {
      return res.status(400).json({ message: "title and boardId not found" });
    }

    const list = await List.findOneAndUpdate(
      {
        _id: listId,
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
    res.status(200).json({ message: "List updated" });
  } catch (error) {
    res.status(500).json({ message: error, Error: "Error updating list" });
  }
};

module.exports = { createList, updateList };
