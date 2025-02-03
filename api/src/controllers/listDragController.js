const Board = require("../models/boardModel");
const List = require("../models/listModel");

const listDrag = async (req, res) => {
  try {
    const { id, currentBoardId, targetBoardId } = req.body;

    const currentBoard = await Board.findById(currentBoardId);
    const targetBoard = await Board.findById(targetBoardId);
    const list = await List.findById(id);
    if (!currentBoard || !targetBoard || !list) {
      return res.status(404).json({ message: "Board/List not found" });
    }

    targetBoard.lists.push(id);
    await targetBoard.save();

    currentBoard.lists.pull(id);
    await currentBoard.save();
    res.status(200).json({ message: "List location Updated" });
  } catch (error) {
    res.status(500).json({ message: error.message || "Error updating list" });
  }
};

module.exports=listDrag;