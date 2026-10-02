import React, { useState } from "react";
import { Layout, User, Menu, X, ArrowRight } from "lucide-react";

export default function LandingNavbar({ onOpenAuth }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-2.5 font-bold text-xl text-white">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-600/30">
            <Layout size={20} />
          </div>
          <span className="tracking-tight">Sprintdesk</span>
        </div>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#features" className="hover:text-blue-400 transition-colors">Features</a>
          <a href="#workflow" className="hover:text-blue-400 transition-colors">Workflow</a>
          <a href="#about" className="hover:text-blue-400 transition-colors">About</a>
        </nav>

        {/* Desktop Actions / User Profile Trigger */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => onOpenAuth("login")}
            className="flex items-center gap-2 rounded-lg border border-slate-700/80 bg-slate-900 px-3.5 py-1.5 text-xs font-semibold text-slate-200 hover:border-slate-500 hover:bg-slate-800 transition-all cursor-pointer"
          >
            <User size={15} className="text-blue-400" />
            <span>Log In</span>
          </button>

          <button
            onClick={() => onOpenAuth("signup")}
            className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/20 cursor-pointer"
          >
            <span>Get Started</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
          className="md:hidden text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-colors"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Slide-down Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-900 px-4 py-4 space-y-3">
          <a
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-300 hover:text-white"
          >
            Features
          </a>
          <a
            href="#workflow"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-300 hover:text-white"
          >
            Workflow
          </a>
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-300 hover:text-white"
          >
            About
          </a>
          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuth("login");
              }}
              className="w-full flex items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-800 py-2 text-xs font-semibold text-slate-200"
            >
              <User size={15} className="text-blue-400" />
              <span>Log In</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuth("signup");
              }}
              className="w-full rounded-lg bg-blue-600 py-2 text-xs font-semibold text-white"
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </header>
  );
}