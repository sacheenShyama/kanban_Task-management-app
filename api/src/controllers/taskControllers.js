const Task = require("../models/taskModel");
const List = require("../models/listModel");

const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority, status, listId } = req.body;

    if (!title || !listId)
      return res.status(401).json({ message: "title, listId missing" });

    const maxOrderTask = await Task.findOne({ listId }).sort("-order");
    const order = maxOrderTask ? maxOrderTask.order + 1 : 0;

    const task = new Task({
      title,
      description,
      dueDate,
      priority,
      listId,
      order,
      status,
    });

    await task.save();
    res.status(200).json({ message: "task created" });
  } catch (error) {
    res.status(500).json({ message: error, Error: "Error creating task" });
  }
};

const getTask = async (req, res) => {
  try {
    const listId = req.query.listId;
    if (!listId) {
      return res.status(400).json({ message: "listId not found" });
    }
    const task = await Task.find({ listId });
    if (!task) {
      return res.status(401).json({ message: "related task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error, Error: "Error fetching task" });
  }
};

const updateTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority, taskId, status } = req.body;
    if (!taskId) {
      return res.status(401).json({ message: "listId missing" });
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

module.exports = { createTask, getTask, updateTask };
