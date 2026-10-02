import React, { useState, useEffect } from "react";
import { DndContext, PointerSensor, useSensor, useSensors, closestCorners } from "@dnd-kit/core";
import { useBoardStore } from "./store/useBoardStore";
import { useAuthStore } from "./store/useAuthStore";
import Column from "./components/Column";
import TaskModal from "./components/TaskModal";
import TaskDrawer from "./components/TaskDrawer";
import LandingPage from "./components/LandingPage";
import AuthModal from "./components/AuthModal";
import { LogOut, Layout } from "lucide-react";

const COLUMNS = [
  { id: "backlog", title: "Backlog" },
  { id: "in_progress", title: "In Progress" },
  { id: "review", title: "Review" },
  { id: "done", title: "Done" },
];

export default function App() {
  // Destructure fetchTasks alongside tasks, moveTask, and addTask
  const { tasks, moveTask, addTask, fetchTasks } = useBoardStore();
  const { user, isAuthenticated, logout } = useAuthStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // FETCH TASKS FROM MYSQL WHEN USER IS AUTHENTICATED
  useEffect(() => {
    if (isAuthenticated) {
      fetchTasks();
    }
  }, [isAuthenticated, fetchTasks]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    const activeTask = tasks.find((t) => t.id === activeId);
    if (!activeTask) return;

    const destinationColumn = COLUMNS.find((col) => col.id === overId);
    if (destinationColumn) {
      if (activeTask.status !== destinationColumn.id) {
        moveTask(activeId, destinationColumn.id);
      }
    } else {
      const targetTask = tasks.find((t) => t.id === overId);
      if (targetTask && activeTask.status !== targetTask.status) {
        moveTask(activeId, targetTask.status);
      }
    }
  };

  // 1. SHOW LANDING PAGE & AUTH MODAL IF NOT LOGGED IN
  if (!isAuthenticated) {
    return (
      <>
        <LandingPage onOpenAuth={() => setIsAuthOpen(true)} />
        <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      </>
    );
  }

  // 2. SHOW KANBAN BOARD WHEN LOGGED IN
  return (
    <div className="min-h-screen bg-slate-950 p-3 sm:p-6 flex flex-col min-w-0 text-slate-100">
      <div className="mx-auto w-full max-w-7xl flex-1 rounded-2xl border border-slate-800 bg-slate-900 p-4 sm:p-6 shadow-2xl flex flex-col min-w-0">
        
        {/* Header Navigation with User Avatar & Logout */}
        <div className="mb-6 flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-blue-600 flex items-center justify-center text-white">
              <Layout size={20} />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white">Sprintdesk Board</h1>
              <p className="text-xs sm:text-sm text-slate-400">Manage sprint tasks and workflow</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/20 cursor-pointer"
            >
              + Add Task
            </button>

            {/* User Profile Badge & Logout Trigger */}
            <div className="flex items-center gap-2.5 pl-4 border-l border-slate-800">
              <div
                title={user?.name || "User Profile"}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white border border-slate-600"
              >
                {user?.initials || "SA"}
              </div>
              <button
                onClick={logout}
                title="Log Out to Landing Page"
                className="flex items-center gap-1 text-slate-400 hover:text-red-400 p-1.5 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer text-xs font-medium"
              >
                <LogOut size={18} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* 4 Column Drag and Drop Board Layout */}
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragEnd={handleDragEnd}
        >
          <div className="flex-1 overflow-x-auto pb-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 min-w-[280px] sm:min-w-[600px] lg:min-w-0">
              {COLUMNS.map((col) => (
                <Column key={col.id} column={col} tasks={tasks} />
              ))}
            </div>
          </div>
        </DndContext>
      </div>

      {/* Popups */}
      {isModalOpen && (
        <TaskModal
          onClose={() => setIsModalOpen(false)}
          onAddTask={(newTask) => {
            addTask(newTask);
            setIsModalOpen(false);
          }}
        />
      )}

      <TaskDrawer />
    </div>
  );
}