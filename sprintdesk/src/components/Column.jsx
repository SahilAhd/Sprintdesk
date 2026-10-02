import React from "react";
import { useDroppable } from "@dnd-kit/core";
import {SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import TaskCard from "./Taskcard";

export default function Column({ column, tasks }) {
const columnTasks = tasks.filter((t) => t.status === column.id);
const taskIds = columnTasks.map((t) => t.id);

  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`flex flex-col rounded-xl p-4 border transition-colors min-h-[500px] ${
        isOver
          ? "bg-slate-800/80 border-blue-500/50"
          : "bg-slate-800/40 border-slate-800/80"
      }`}
    >
      {/* Column Title & Dynamic Counter */}
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
        <h2 className="font-semibold text-slate-200">{column.title}</h2>
        <span className="rounded-full bg-slate-800 border border-slate-700 px-2.5 py-0.5 text-xs font-mono font-medium text-slate-400">
          {columnTasks.length}
        </span>
      </div>

      {/* Task Droppable Zone */}
      <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
        <div className="flex flex-col gap-3 flex-1">
          {columnTasks.length === 0 ? (
            <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed border-slate-800 text-xs text-slate-500">
              Drop tasks here
            </div>
          ) : (
            columnTasks.map((task) => <TaskCard key={task.id} task={task} />)
          )}
        </div>
      </SortableContext>
    </div>
  );
}