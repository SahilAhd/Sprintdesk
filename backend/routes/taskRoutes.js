import express from "express";
import {
  getTasks,
  createNewTask,
  updateTaskDetails,
  removeTask,
} from "../controllers/taskController.js";

const router = express.Router();

// Fetch all Kanban tasks
router.get("/", getTasks);

// Create a new task
router.post("/", createNewTask);

// Update task status, title, priority, or comments
router.patch("/:id", updateTaskDetails);

// Delete a task
router.delete("/:id", removeTask);

export default router;