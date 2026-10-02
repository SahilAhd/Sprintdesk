import React, { useState } from "react";
import { useBoardStore } from "../store/useBoardStore";
import { X, Trash2, MessageSquare, Calendar, User, Tag } from "lucide-react";

export default function TaskDrawer() {
  const { selectedTask, closeDrawer, updateTask, deleteTask, addComment } =
    useBoardStore();

  const [isConfirmDelete, setIsConfirmDelete] = useState(false);
  const [commentInput, setCommentInput] = useState("");

  if (!selectedTask) return null;

  // Fix 1: Synchronize state updates cleanly across key formats
  const handleFieldChange = (field, value) => {
    const updated = { ...selectedTask, [field]: value };

    if (field === "due_date" || field === "dueDate") {
      updated.due_date = value;
      updated.dueDate = value;
    }

    updateTask(updated);
  };

  const handleDelete = async () => {
    await deleteTask(selectedTask.id);
    setIsConfirmDelete(false);
    closeDrawer();
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    addComment(selectedTask.id, commentInput);
    setCommentInput("");
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs transition-opacity">
      {/* Drawer Container */}
      <div className="w-full max-w-lg bg-slate-900 border-l border-slate-800 h-full p-6 flex flex-col justify-between overflow-y-auto text-slate-100 shadow-2xl">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <span className="text-xs font-mono text-slate-400">{selectedTask.id}</span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsConfirmDelete(true)}
                className="text-red-400 hover:text-red-300 p-1.5 rounded-lg hover:bg-red-500/10 transition-colors cursor-pointer"
                title="Delete Task"
              >
                <Trash2 size={18} />
              </button>
              <button
                onClick={closeDrawer}
                className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Delete Confirmation Warning */}
          {isConfirmDelete && (
            <div className="my-4 p-4 rounded-xl border border-red-500/30 bg-red-500/10 text-xs">
              <p className="font-semibold text-red-300 mb-2">
                Are you sure you want to delete this task?
              </p>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setIsConfirmDelete(false)}
                  className="px-3 py-1 rounded-md bg-slate-800 text-slate-300 hover:bg-slate-700 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-3 py-1 rounded-md bg-red-600 text-white hover:bg-red-500 font-medium cursor-pointer"
                >
                  Confirm Delete
                </button>
              </div>
            </div>
          )}

          {/* Title Edit */}
          <div className="mt-4">
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1">
              Title
            </label>
            <input
              type="text"
              value={selectedTask.title || ""}
              onChange={(e) => handleFieldChange("title", e.target.value)}
              className="w-full bg-slate-800/60 border border-slate-700 rounded-lg p-2.5 text-base font-semibold text-white focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Meta Properties Grid */}
          <div className="grid grid-cols-2 gap-4 my-6 p-4 rounded-xl bg-slate-800/30 border border-slate-800 text-xs">
            {/* Priority */}
            <div>
              <span className="flex items-center gap-1.5 text-slate-400 mb-1">
                <Tag size={14} /> Priority
              </span>
              <select
                value={selectedTask.priority || "Medium"}
                onChange={(e) => handleFieldChange("priority", e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-slate-200 focus:outline-none"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <span className="flex items-center gap-1.5 text-slate-400 mb-1">
                <Tag size={14} /> Column / Status
              </span>
              <select
                value={selectedTask.status || "backlog"}
                onChange={(e) => handleFieldChange("status", e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-slate-200 focus:outline-none"
              >
                <option value="backlog">Backlog</option>
                <option value="in_progress">In Progress</option>
                <option value="review">Review</option>
                <option value="done">Done</option>
              </select>
            </div>

            {/* Fix 2: Assignee Input handling */}
            <div>
              <span className="flex items-center gap-1.5 text-slate-400 mb-1">
                <User size={14} /> Assignee
              </span>
              <input
                type="text"
                placeholder="e.g. Sahil"
                value={
                  typeof selectedTask.assignee === "object"
                    ? selectedTask.assignee?.name || ""
                    : selectedTask.assignee || ""
                }
                onChange={(e) => {
                  const val = e.target.value;
                  const assigneeObj = {
                    name: val,
                    initials: val ? val.trim().slice(0, 2).toUpperCase() : "U",
                  };
                  updateTask({
                    ...selectedTask,
                    assignee: assigneeObj,
                    assignee_initials: assigneeObj.initials,
                  });
                }}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-slate-200 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Due Date Input */}
            <div>
              <span className="flex items-center gap-1.5 text-slate-400 mb-1">
                <Calendar size={14} /> Due Date
              </span>
              <input
                type="date"
                value={
                  selectedTask.due_date
                    ? selectedTask.due_date.split("T")[0]
                    : selectedTask.dueDate || ""
                }
                onChange={(e) => handleFieldChange("due_date", e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-slate-200 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Comments Section */}
          <div className="border-t border-slate-800 pt-4">
            <h4 className="flex items-center gap-2 text-sm font-semibold text-slate-200 mb-3">
              <MessageSquare size={16} /> Comments (
              {selectedTask.comments?.length || 0})
            </h4>

            {/* Comment Input */}
            <form onSubmit={handleCommentSubmit} className="flex gap-2 mb-4">
              <input
                type="text"
                placeholder="Write a comment..."
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                className="flex-1 bg-slate-800 border border-slate-700 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-600 px-3 py-2 rounded-lg text-xs font-semibold text-white hover:bg-blue-500 transition-colors cursor-pointer"
              >
                Send
              </button>
            </form>

            {/* Comments List */}
            <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
              {selectedTask.comments?.map((c) => (
                <div
                  key={c.id}
                  className="p-2.5 rounded-lg bg-slate-800/40 border border-slate-800 text-xs"
                >
                  <div className="flex items-center justify-between text-slate-400 mb-1 text-[10px]">
                    <span className="font-medium text-blue-400">{c.author}</span>
                    <span>{c.date}</span>
                  </div>
                  <p className="text-slate-300">{c.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}