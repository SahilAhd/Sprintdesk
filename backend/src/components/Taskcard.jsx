import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useBoardStore } from "../store/useBoardStore";

export default function TaskCard({ task }) {
  const { setSelectedTask } = useBoardStore();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  const priorityColors = {
    High: "bg-red-500/10 text-red-400 border-red-500/30",
    Medium: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
    Low: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  };

  // Safely trigger drawer without drag listener interference
  const handleCardClick = (e) => {
    e.stopPropagation();
    setSelectedTask(task);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={handleCardClick}
      className="group cursor-grab active:cursor-grabbing rounded-xl border border-slate-700/60 bg-slate-800/80 p-4 shadow-sm transition-all hover:border-slate-500 hover:bg-slate-800 select-none"
    >
      {/* Top Row: Task ID & Priority Badge */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-mono text-slate-400">{task.id}</span>
        <span
          className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${
            priorityColors[task.priority] || priorityColors.Low
          }`}
        >
          {task.priority || "Low"}
        </span>
      </div>

      {/* Task Title */}
      <h3 className="font-medium text-slate-100 text-sm mb-3 group-hover:text-blue-400 transition-colors">
        {task.title}
      </h3>

      {/* Bottom Row: Date, Comment Counter, & Assignee */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-700/50 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span>📅 {task.due_date || task.dueDate || "No date"}</span>
          {task.comments?.length > 0 && (
            <span>💬 {task.comments.length}</span>
          )}
        </div>
        <div
          title={task.assignee?.name || "User"}
          className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white border border-slate-600"
        >
          {task.assignee?.initials || task.assignee_initials || "U"}
        </div>
      </div>
    </div>
  );
}