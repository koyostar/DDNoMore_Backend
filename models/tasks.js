const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const formatDuration = (ms) => {
  let totalSeconds = Math.floor(ms / 1000);
  let hours = Math.floor(totalSeconds / 3600);
  let minutes = Math.floor((totalSeconds % 3600) / 60);
  let seconds = totalSeconds % 60;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}:${String(seconds).padStart(2, "0")}`;
};

const taskSchema = new Schema(
  {
    title: { type: String, required: true },
    dueDate: { type: Date, default: new Date(), required: true },
    priority: {
      type: String,
      default: "Normal",
      enum: ["High", "Medium", "Normal", "Low"],
      required: true,
    },
    status: {
      type: String,
      default: "To Do",
      enum: ["To Do", "In Progress", "Completed"],
      required: true,
    },
    startDate: { type: Date },
    loggedTime: {
      type: String,
      default: "00:00:00",
      validate: {
        validator: function (value) {
          return /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/.test(value);
        },
        message: (props) =>
          `${props.value} is not a valid duration format! Use hh:mm:ss format.`,
      },
    },
    completedDate: { type: Date },
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

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
