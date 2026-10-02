import React from "react";
import { Kanban, Zap, ShieldCheck, CheckCircle2, ArrowRight } from "lucide-react";

export default function LandingHero({ onOpenAuth }) {
  return (
    <main className="flex-1 text-slate-100">
      {/* Hero Container */}
      <section className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-24 lg:py-28 max-w-7xl mx-auto text-center">
        {/* Glow backdrop decorative accent */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-blue-600/15 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 border border-blue-500/20 px-3.5 py-1 text-xs font-semibold text-blue-400 mb-6">
            <Zap size={14} /> Agile Sprint Management Platform
          </span>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight sm:leading-tight">
            Streamline Software Sprints with <span className="text-blue-500">Sprintdesk</span>
          </h1>

          <p className="mt-4 sm:mt-6 text-sm sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Organize tasks, track status transitions in real time, and collaborate smoothly across Backlog, In Progress, Review, and Done.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <button
              onClick={() => onOpenAuth("signup")}
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-3 text-sm font-bold text-white hover:bg-blue-500 transition-all shadow-xl shadow-blue-600/25 cursor-pointer"
            >
              <span>Get Started Free</span>
              <ArrowRight size={16} />
            </button>
            <button
              onClick={() => onOpenAuth("login")}
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl border border-slate-700/80 bg-slate-900/80 px-7 py-3 text-sm font-semibold text-slate-300 hover:border-slate-500 hover:bg-slate-800 transition-all cursor-pointer"
            >
              <span>Explore Board Demo</span>
            </button>
          </div>
        </div>

        {/* Board Mockup Visual Preview */}
        <div className="mt-14 max-w-5xl mx-auto rounded-2xl border border-slate-800 bg-slate-900/60 p-4 sm:p-6 shadow-2xl backdrop-blur-sm text-left">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-red-500/80" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
              <div className="h-3 w-3 rounded-full bg-green-500/80" />
            </div>
            <span className="text-xs font-mono text-slate-500">sprintdesk.app/board</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-800">
              <span className="text-xs font-semibold text-slate-400">Backlog (12)</span>
              <div className="mt-2 p-2.5 rounded-lg bg-slate-800 border border-slate-700/60 text-xs">
                <span className="text-red-400 font-medium">High</span>
                <p className="text-slate-200 mt-1 font-medium">Setup API Routes</p>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-800">
              <span className="text-xs font-semibold text-slate-400">In Progress (4)</span>
              <div className="mt-2 p-2.5 rounded-lg bg-slate-800 border border-slate-700/60 text-xs">
                <span className="text-yellow-400 font-medium">Medium</span>
                <p className="text-slate-200 mt-1 font-medium">Auth Middleware</p>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-800">
              <span className="text-xs font-semibold text-slate-400">Review (3)</span>
              <div className="mt-2 p-2.5 rounded-lg bg-slate-800 border border-slate-700/60 text-xs">
                <span className="text-blue-400 font-medium">Testing</span>
                <p className="text-slate-200 mt-1 font-medium">Responsive Layout</p>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-800">
              <span className="text-xs font-semibold text-slate-400">Done (8)</span>
              <div className="mt-2 p-2.5 rounded-lg bg-slate-800 border border-slate-700/60 text-xs">
                <span className="text-emerald-400 font-medium">Completed</span>
                <p className="text-slate-200 mt-1 font-medium">Tailwind Config</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="border-t border-slate-800 bg-slate-900/30 px-4 py-16 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Designed for Modern Developers</h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">Everything you need to keep sprint tasks organized and moving forward.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60">
              <Kanban className="text-blue-400 mb-3" size={24} />
              <h3 className="font-semibold text-white text-base mb-1">Interactive Board</h3>
              <p className="text-xs text-slate-400">Fluid drag-and-drop workflow across 4 customizable sprint status columns.</p>
            </div>
            <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60">
              <CheckCircle2 className="text-blue-400 mb-3" size={24} />
              <h3 className="font-semibold text-white text-base mb-1">Task Side Drawer</h3>
              <p className="text-xs text-slate-400">Detailed task management with title editing, priority badges, and comments.</p>
            </div>
            <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60">
              <ShieldCheck className="text-blue-400 mb-3" size={24} />
              <h3 className="font-semibold text-white text-base mb-1">State Persistence</h3>
              <p className="text-xs text-slate-400">Automatic local persistence ensures board progress is never lost on refresh.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}