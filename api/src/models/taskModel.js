const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: { type: String },
    dueDate: { type: Date },
    priority: {
      type: String,
      enum: ["Low", "medium", "High"],
      default: "Medium",
    },
    status: {
      type: String,
      enum: ["Pending", "Review", "Completed"],
      default: "Review",
    },
    listId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "List",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
