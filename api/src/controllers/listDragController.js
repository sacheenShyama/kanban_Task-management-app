const mongoose = require("mongoose");
const Board = require("../models/boardModel");
const List = require("../models/listModel");

const listDrag = async (req, res) => {
  console.log("api backend hit");
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { id, currentBoardId, targetBoardId } = req.body;
    if (!id || !currentBoardId || !targetBoardId) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: "Invalid requested data" });
    }

    const currentBoard = await Board.findById(currentBoardId).session(session);
    const targetBoard = await Board.findById(targetBoardId).session(session);
    const list = await List.findById(id).session(session);
    if (!currentBoard || !targetBoard || !list) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Board and List not found" });
    }

    if (!currentBoard.lists.includes(id)) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Board and List not found" });
    }

    if (targetBoard.lists.includes(id)) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: "List already in target board" });
    }

    currentBoard.lists = currentBoard.lists.filter(
      (listId) => listId.toString() !== id
    );
    targetBoard.lists.push(id);
    await currentBoard.save({ session });
    await targetBoard.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({ message: "List location Updated" });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ message: error.message || "Error updating list" });
  }
};

module.exports = listDrag;
