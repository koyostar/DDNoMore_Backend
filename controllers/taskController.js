const Task = require("./../models/tasks");
const User = require("./../models/users");

async function createTask(req, res) {
  try {
    const taskDetails = req.body;
    const task = await Task.create(taskDetails);

    return res
      .status(201)
      .json({ task, message: "Task created successfully." });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function duplicateTask(req, res) {
  try {
    const taskId = req.params.id;

    const originalTask = await Task.findById(taskId);
    const duplicatedTask = await Task.create({
      title: originalTask.title,
      dueDate: originalTask.dueDate,
      priority: originalTask.priority,
      status: originalTask.status,
      description: originalTask.description,
      createdBy: originalTask.createdBy,
    });

    return res
      .status(201)
      .json({ task: duplicatedTask, message: "Task duplicated successfully." });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function editTask(req, res) {
  try {
    const taskId = req.params.id;
    const taskDetails = req.body;

    const updatedTask = await Task.findByIdAndUpdate(taskId, taskDetails, {
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
  try {
    const taskId = req.params.id;

    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function archiveTask(req, res) {
  try {
    const taskId = req.params.id;

    const archivedTask = await Task.findByIdAndUpdate(
      taskId,
      { isArchived: true },
      { new: true }
    );

    return res.status(200).json({ archivedTask, message: "Task archived." });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function restoreTask(req, res) {
  try {
    const taskId = req.params.id;

    const restoredTask = await Task.findByIdAndUpdate(
      taskId,
      { isArchived: false },
      { new: true }
    );

    return res.status(200).json({ restoredTask, message: "Task restored." });
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

async function getTasksByUser(req, res) {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username: username });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const tasks = await Task.find({ createdBy: user._id });

    res.status(200).json(tasks);
  } catch (error) {
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
  getTasksByUser,
  getTaskById,
  getTasksByStatus,
  getTasksByPriority,
  getTasksByIsArchived,
};
