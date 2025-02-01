const Task = require("../models/taskModel");
const List = require("../models/listModel");

const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority, status, listId } = req.body;

    if (!title || !listId)
      return res.status(401).json({ message: "title or listId not found" });

    const list = await List.findById({ _id: listId });
    if (!list) {
      return res.status(402).json({ message: "List not found" });
    }
    const task = new Task({
      title,
      description,
      dueDate,
      priority,
      status,
      listId,
    });

    await task.save();

    list.tasks.push(task);
    await list.save();

    res.status(200).json({ message: "task created" });
  } catch (error) {
    res.status(500).json({ message: error, Error: "Error creating task" });
  }
};

const updateTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority, taskId, status } = req.body;
    if (!taskId) {
      return res.status(401).json({ message: "taskId not found" });
    }
    const task = await Task.findOneAndUpdate(
      { _id: taskId },
      {
        title,
        description,
        dueDate,
        priority,
        status,
      }
    );
    if (!task) {
      return res.status(402).json({ message: "task not found" });
    }
    res.status(200).json({ message: "task updated" });
  } catch (error) {
    res.status(500).json({ message: error, Error: "Error updating task" });
  }
};

const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    if (!taskId) {
      return res.status(400).json({ message: "task not found" });
    }
    await Task.findByIdAndDelete({ _id: taskId });
    res.status(200).json({ message: "Task Deleted" });
  } catch (error) {
    res.status(500).json({ message: error, Error: "Error deleting task" });
  }
};
module.exports = { createTask, updateTask, deleteTask };
