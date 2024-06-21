const Task = require("./../models/tasks");
const User = require("./../models/users");

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

const calculateLoggedTime = (startDate, completedDate, previousLoggedTime) => {
  const durationMs = completedDate - startDate;
  const previousDurationParts = previousLoggedTime.split(":");
  const previousDurationMs =
    +previousDurationParts[0] * 60 * 60 * 1000 +
    +previousDurationParts[1] * 60 * 1000 +
    +previousDurationParts[2] * 1000;
  return formatDuration(durationMs + previousDurationMs);
};

async function startTimer(req, res) {
  try {
    const taskId = req.params.id;

    const task = await Task.findByIdAndUpdate(
      taskId,
      {
        startDate: new Date(),
        completedDate: null,
        status: "In Progress",
      },
      { new: true }
    );

    return res
      .status(200)
      .json({ task, message: "You've started working on your task." });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function pauseTimer(req, res) {
  try {
    const taskId = req.params.id;

    const completedDate = new Date();
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ error: "Task not found." });
    }

    const loggedTime = calculateLoggedTime(
      task.startDate,
      completedDate,
      task.loggedTime
    );

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      {
        completedDate: completedDate,
        loggedTime: loggedTime,
        status: "To Do",
      },
      { new: true }
    );

    return res.status(200).json({
      updatedTask,
      message: "Taking a break? Don't forget to come back!",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function endTimer(req, res) {
  try {
    const taskId = req.params.id;

    const completedDate = new Date();
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ error: "Task not found." });
    }

    const loggedTime = calculateLoggedTime(
      task.startDate,
      completedDate,
      task.loggedTime
    );
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      {
        completedDate: completedDate,
        loggedTime: loggedTime,
        status: "Completed",
      },
      { new: true }
    );

    return res
      .status(200)
      .json({
        updatedTask,
        message: "Congratulations! You've completed the task.",
      });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

module.exports = {
  startTimer,
  pauseTimer,
  endTimer,
};
