const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AutoIncrement = require("mongoose-sequence")(mongoose);

const taskSchema = new Schema(
  {
    taskId: {
      type: Number,
      unique: true,
    },
    title: { type: String, required: true },
    dueDate: { type: Date, default: new Date(), required: true },
    priority: {
      type: String,
      default: "normal",
      enum: ["high", "medium", "normal", "low"],
      required: true,
    },
    status: {
      type: String,
      default: "to-do",
      enum: ["to-do", "in progress", "completed"],
      required: true,
    },
    startDate: { type: Date, default: new Date() },
    completedDate: { type: Date, default: new Date() },
    isArchived: { type: Boolean, default: false },
    description: { type: String },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

taskSchema.plugin(AutoIncrement, { inc_field: "taskId" });

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
