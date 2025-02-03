const List = require("../models/listModel");
const Task = require("../models/taskModel");

const taskDrag = async (req, res) => {
  try {
    const { id, currentListId, targetListId } = req.body;
    const currentList = await List.findById(currentListId);
    const targetList = await List.findById(targetListId);
    const task = await Task.findById(id);

    if (!currentList || !targetList || !task) {
      return res.status(404).json({ message: "Task and List not found" });
    }

    currentList.tasks.pull(task);
    await currentList.save();

    targetList.tasks.push(task);
    await targetList.save();

    res.status(200).json({ message: "Task location updated" });
  } catch (error) {
    res.status(500).json({ message: error.message || "Error updating task" });
  }
};

module.exports=taskDrag;