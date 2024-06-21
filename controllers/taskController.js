const Task = require("./../models/tasks");

async function createTask(req, res) {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

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
    console.log("Task created:", task);

    return res
      .status(201)
      .json({ task, message: "Task created successfully." });
  } catch (error) {
    console.error("Error creating task:", error);

    return res.status(500).json({ error: error.message });
  }
}

async function duplicateTask(req, res) {
  const { taskId } = req.params;
  const createdBy = req.user._id;

  try {
    const originalTask = await Task.findById(taskId);
    const duplicatedTask = await Task.create({
      title: originalTask.title,
      dueDate: originalTask.dueDate,
      priority: originalTask.priority,
      status: originalTask.status,
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
  const { taskId } = req.params;
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

async function deleteTask(req, res) {
  const { taskId } = req.params;
  try {
    const deletedTask = await Task.deleteOne(taskId);
    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function archiveTask(req, res) {
  const { taskId } = req.params;
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
  const { taskId } = req.params;
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
    console.log("All Tasks:", tasks);

    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching all tasks:", error);

    res.status(500).json({ error: error.message });
  }
}

async function getTaskById(req, res) {
  const { taskId } = req.params;
  try {
    const task = await Task.findById(taskId);
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
  deleteTask,
  archiveTask,
  restoreTask,
  getAllTasks,
  getTaskById,
  getTasksByStatus,
  getTasksByPriority,
  getTasksByIsArchived,
};
