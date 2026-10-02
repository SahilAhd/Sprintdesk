import { create } from "zustand";

const API_URL = "http://127.0.0.1:5000/api/tasks";

export const useBoardStore = create((set, get) => ({
  tasks: [],
  loading: false,
  error: null,

  // Drawer state for active task details
  selectedTask: null,
  setSelectedTask: (task) => set({ selectedTask: task }),
  closeDrawer: () => set({ selectedTask: null }),

  // 1. FETCH TASKS FROM MYSQL
  fetchTasks: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch tasks");

      set({ tasks: data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  // 2. CREATE A NEW TASK IN MYSQL
  addTask: async (taskData) => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData),
      });
      const newTask = await res.json();
      if (!res.ok) throw new Error(newTask.message || "Failed to add task");

      set((state) => ({ tasks: [newTask, ...state.tasks] }));
    } catch (err) {
      console.error("Error adding task:", err.message);
    }
  },

  // 3. MOVE TASK / UPDATE STATUS IN MYSQL
  moveTask: async (taskId, newStatus) => {
    // Optimistic UI update (moves instantly on screen)
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      ),
    }));

    try {
      const res = await fetch(`${API_URL}/${taskId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error("Failed to update status on server");
    } catch (err) {
      console.error("Failed to sync move with server:", err.message);
      get().fetchTasks(); // Revert state on error
    }
  },

  // 4. DELETE TASK FROM MYSQL
  deleteTask: async (taskId) => {
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== taskId),
      selectedTask: state.selectedTask?.id === taskId ? null : state.selectedTask,
    }));

    try {
      const res = await fetch(`${API_URL}/${taskId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete task");
    } catch (err) {
      console.error("Error deleting task:", err.message);
      get().fetchTasks();
    }
  },
}));