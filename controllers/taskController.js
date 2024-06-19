const Task = require("./models/tasks");

async function createTask(reg, res) {
  try {
    const { title, dueDate, priority, status, description } = req.body;
    const createdBy = req.user._id;
    const task = await Task.create({
      title,
      dueDate,
      priority,
      status,
      description,
      createdBy,
    });
    return res
      .status(201)
      .json({ task, message: "Task created successfully." });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function duplicateTask(req, res) {
  const taskId = req.params.id;
  const createdBy = req.user._id;

  try {
    const originalTask = await Task.findById(taskId);
    const duplicatedTask = await Task.create({
      title: originalTask.title,
      dueDate: originalTask.dueDate,
      priority: originalTask.priority,
      status: originalTask.status,
      startDate: originalTask.startDate,
      completedDate: originalTask.completedDate,
      isArchived: originalTask.isArchived,
      description: originalTask.description,
      createdBy,
    });

    return res
      .status(201)
      .json({ task: duplicatedTask, message: "Task duplicated successfully." });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function editTask(req, res) {
  const taskId = req.params.id;
  const updates = req.body;
  try {
    const updatedTask = await Task.findByIdAndUpdate(taskId, updates, {
      new: true,
    });

    return res
      .status(200)
      .json({ updatedTask, message: "Task updated successfully." });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function archiveTask(req, res) {
  const taskId = req.params.id;
  try {
    const task = await Task.findByIdAndUpdate(
      taskId,
      { isArchived: true },
      { new: true }
    );

    return res.status(200).json({ task, message: "Task archived." });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function restoreTask(req, res) {
  const taskId = req.params.id;
  try {
    const task = await Task.findByIdAndUpdate(
      taskId,
      { isArchived: false },
      { new: true }
    );

    return res.status(200).json({ task, message: "Task restored." });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function getAllTasks(req, res) {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getTaskById(req, res) {
  const { taskId } = req.params;
  try {
    const task = await Task.findOne({ taskId: taskId });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getTasksByStatus(req, res) {
  const { status } = req.params;
  try {
    const tasks = await Task.find({ status });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getTasksByPriority(req, res) {
  const { priority } = req.params;
  try {
    const tasks = await Task.find({ priority });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getTasksByIsArchived(req, res) {
  const { isArchived } = req.params;
  try {
    const tasks = await Task.find({ isArchived });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createTask,
  duplicateTask,
  editTask,
  archiveTask,
  restoreTask,
  getAllTasks,
  getTaskById,
  getTasksByStatus,
  getTasksByPriority,
  getTasksByIsArchived,
};
