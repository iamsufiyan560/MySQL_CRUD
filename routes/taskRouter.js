const express = require("express");
const {
  fetchTasks,
  fetchTaskById,
  createTask,
  updateTaskById,
  deleteTaskById,
} = require("../controller/taskController");
const router = express.Router();

router.get("/", fetchTasks);
router.get("/:id", fetchTaskById);
router.post("/", createTask);
router.put("/:id", updateTaskById);
router.delete("/:id", deleteTaskById);

module.exports = router;
