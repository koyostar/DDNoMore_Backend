const express = require("express");
const router = express.Router();
const taskController = require("./../controllers/taskController");
const timerController = require("./../controllers/timerController");

router.post("/tasks/create", taskController.createTask);
router.delete("/tasks/:id", taskController.deleteTask);
router.post("/tasks/:id/duplicate", taskController.duplicateTask);
router.put("/tasks/:id/edit", taskController.editTask);
router.put("/tasks/:id/archive", taskController.archiveTask);
router.put("/tasks/:id/restore", taskController.restoreTask);

router.get("/tasks", taskController.getAllTasks);
router.get("/tasks/user/:username", taskController.getTasksByUser);
router.get("/tasks/id/:taskId", taskController.getTaskById);
router.get("/tasks/status/:status", taskController.getTasksByStatus);
router.get("/tasks/priority/:priority", taskController.getTasksByPriority);
router.get("/tasks/archived/:isArchived", taskController.getTasksByIsArchived);

router.put("/timer/:id/start", timerController.startTimer);
router.put("/timer/:id/pause", timerController.pauseTimer);
router.put("/timer/:id/end", timerController.endTimer);
router.put("/timer/:id/reset", timerController.resetTimer);

module.exports = router;
