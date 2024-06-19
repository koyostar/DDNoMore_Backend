const Task = require("./models/tasks");
const User = require("./models/users");

async function startTimer(req, res) {
  const taskId = req.params.id;
  try {
    const task = await Task.findByIdAndUpdate(
      taskId,
      { startDate: new Date() },
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
  const taskId = req.params.id;
  try {
    const task = await Task.findByIdAndUpdate(
      taskId,
      { completedDate: new Date() },
      { new: true }
    );

    return res
      .status(200)
      .json({ task, message: "Taking a break? Don't forget to come back!" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function endTimer(req, res) {
  const taskId = req.params.id;
  try {
    const task = await Task.findByIdAndUpdate(
      taskId,
      { completedDate: new Date(), status: "completed" },
      { new: true }
    );

    return res
      .status(200)
      .json({ task, message: "Congratulations! You've completed the task." });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

module.exports = {
  startTimer,
  pauseTimer,
  endTimer,
};
