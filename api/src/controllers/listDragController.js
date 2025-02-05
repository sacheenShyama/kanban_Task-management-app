const mongoose = require("mongoose");
const Board = require("../models/boardModel");
const List = require("../models/listModel");

const listDrag = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const { id, currentBoardId, targetBoardId } = req.body;

    if (!id || !currentBoardId || !targetBoardId) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: "Invalid requested data" });
    }

    const list = await List.findById(id).session(session);
    const currentBoard = await Board.findById(currentBoardId).session(session);
    const targetBoard = await Board.findById(targetBoardId).session(session);

    if (!list || !currentBoard || !targetBoard) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Board or List not found" });
    }

    if (list.boardId.toString() !== currentBoardId) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({
        message: "List does not belong to the specified current board",
      });
    }

    currentBoard.lists = currentBoard.lists.filter(
      (listId) => listId.toString() !== id
    );

    targetBoard.lists.push(id);

    list.boardId = targetBoardId;

    await currentBoard.save({ session });
    await targetBoard.save({ session });
    await list.save({ session });

    await session.commitTransaction();
    session.endSession();

    return res.status(200).json({
      message: "List moved successfully",
      list,
      currentBoard,
      targetBoard,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return res.status(500).json({
      message: "Error moving list",
      error: process.env.NODE_ENV === "development" ? error : undefined,
    });
  }
};

module.exports = listDrag;
