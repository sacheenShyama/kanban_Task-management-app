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

    const maxOrderList = await List.findOne({ boardId }).sort("-order");
    console.log("1", maxOrderList);
    const order = maxOrderList ? maxOrderList.order + 1 : 0;

    const list = new List({ title, boardId, order });
    await list.save();
    res.status(200).json({ message: "list created" });
  } catch (error) {
    res.status(500).json({ message: error, Error: "Error creating list" });
  }
};

const getList = async (req, res) => {
  try {
    const boardId = req.query.boardId;
    if (!boardId) return res.status(400).json({ message: "boardId not found" });

    const list = await List.find({ boardId });
    if (!list) {
      return res.status(401).json({ message: "related list not found" });
    }
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json({ message: error, Error: "Error fetching list" });
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

module.exports = { createList, getList, updateList };
