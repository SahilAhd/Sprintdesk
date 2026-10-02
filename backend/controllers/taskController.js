import * as TaskModel from "../models/Task.js";

// GET /api/tasks
export async function getTasks(req, res) {
  try {
    const tasks = await TaskModel.getAllTasks();
    const formattedTasks = tasks.map((task) => ({
      ...task,
      comments: typeof task.comments === "string" ? JSON.parse(task.comments) : task.comments || [],
    }));
    res.json(formattedTasks);
  } catch (error) {
    console.error("❌ Error fetching tasks:", error.message);
    res.status(500).json({ message: "Failed to fetch tasks", error: error.message });
  }
}

// POST /api/tasks
export async function createNewTask(req, res) {
  try {
    const { id, title, status, priority, due_date, dueDate, comments } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Task title is required" });
    }

    const taskId = id || `SD-${Math.floor(100 + Math.random() * 900)}`;
    const dateValue = due_date || dueDate || null;

    await TaskModel.createTask({
      id: taskId,
      title,
      status: status || "backlog",
      priority: priority || "Medium",
      due_date: dateValue,
      user_id: req.user ? req.user.id : null,
      comments: comments || [],
    });

    res.status(201).json({
      id: taskId,
      title,
      status: status || "backlog",
      priority: priority || "Medium",
      due_date: dateValue,
      dueDate: dateValue,
      comments: comments || [],
    });
  } catch (error) {
    console.error("❌ Error creating task in MySQL:", error.message);
    res.status(500).json({ message: "Failed to create task", error: error.message });
  }
}

// PATCH /api/tasks/:id
export async function updateTaskDetails(req, res) {
  try {
    const { id } = req.params;
    const updates = { ...req.body };

    if (updates.dueDate !== undefined) {
      updates.due_date = updates.dueDate;
      delete updates.dueDate;
    }

    if (updates.comments && typeof updates.comments !== "string") {
      updates.comments = JSON.stringify(updates.comments);
    }

    Object.keys(updates).forEach((key) => {
      if (updates[key] === undefined) delete updates[key];
    });

    await TaskModel.updateTask(id, updates);
    res.json({ message: "Task updated successfully", id, updates });
  } catch (error) {
    console.error("❌ Error updating task in MySQL:", error.message);
    res.status(500).json({ message: "Failed to update task", error: error.message });
  }
}

// DELETE /api/tasks/:id
export async function removeTask(req, res) {
  try {
    const { id } = req.params;
    await TaskModel.deleteTask(id);
    res.json({ message: "Task deleted successfully", id });
  } catch (error) {
    console.error("❌ Error deleting task from MySQL:", error.message);
    res.status(500).json({ message: "Failed to delete task", error: error.message });
  }
}