const Task = require("../models/taskModel");
const List = require("../models/listModel");

const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority, status, listId } = req.body;

    if (!title || !listId) {
      return res.status(400).json({ message: "Title and listId are required" });
    }

    const list = await List.findById({ _id: listId });
    if (!list) {
      return res.status(404).json({ message: "List not found" });
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

    res.status(201).json({ message: "Task created", task });
  } catch (error) {
    res.status(500).json({ message: error.message || "Error creating task" });
  }
};

const updateTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority, status } = req.body;
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "Task ID is required" });
    }
    const task = await Task.findOneAndUpdate(
      { _id: id },
      {
        title,
        description,
        dueDate,
        priority,
        status,
      },
      { new: true, runValidators: true }
    );
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task updated", task });
  } catch (error) {
    res.status(500).json({ message: error.message || "Error updating task" });
  }
};

const deleteTask = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "Task ID is required" });
    }
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message || "Error deleting task" });
  }
};
module.exports = { createTask, updateTask, deleteTask };
