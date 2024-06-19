const express = require("express");
const router = express.Router();
const taskController = require("./controllers/taskController");
const timerController = require("./controllers/timerController");

router.post("/tasks/create", taskController.createTask);
router.delete("/tasks/:id", taskController.deleteTask);
router.post("/tasks/duplicate/:id", taskController.duplicateTask);
router.put("/tasks/edit/:id", taskController.editTask);
router.put("/tasks/archive/:id", taskController.archiveTask);

router.get("/tasks", getAllTasks);
router.get("/tasks/:taskId", getTaskById);
router.get("/tasks/status/:status", getTasksByStatus);
router.get("/tasks/priority/:priority", getTasksByPriority);
router.get("/tasks/archived/:isArchived", getTasksByIsArchived);

router.put("/timer/start/:id", timerController.startTimer);
router.put("/timer/pause/:id", timerController.pauseTimer);
router.put("/timer/end/:id", timerController.endTimer);

module.exports = router;
