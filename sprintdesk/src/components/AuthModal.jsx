import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { X, Lock, Mail, User } from "lucide-react";

export default function AuthModal({ isOpen, onClose }) {
  // Extract both login and register from the updated Zustand store
  const { login, register } = useAuthStore();
  
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // UI Feedback States
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    const cleanEmail = email.trim();
    const cleanPassword = password.trim();
    const cleanName = name.trim();

    if (!cleanEmail || !cleanPassword) {
      setErrorMsg("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    let result;
    if (isSignUp) {
      if (!cleanName) {
        setErrorMsg("Please enter your name.");
        setLoading(false);
        return;
      }
      // Call Express API /api/auth/register
      result = await register(cleanName, cleanEmail, cleanPassword);
    } else {
      // Call Express API /api/auth/login
      result = await login(cleanEmail, cleanPassword);
    }

    setLoading(false);

    if (result.success) {
      // Reset state and close modal on success
      setName("");
      setEmail("");
      setPassword("");
      onClose();
    } else {
      // Display backend MySQL / Auth error message to user
      setErrorMsg(result.message || "Authentication failed");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl relative text-slate-100">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white mb-1">
            {isSignUp ? "Create Sprintdesk Account" : "Welcome Back"}
          </h2>
          <p className="text-xs text-slate-400">
            {isSignUp ? "Start managing your agile sprint tasks today" : "Sign in to access your interactive Kanban board"}
          </p>
        </div>

        {/* Error Alert Box */}
        {errorMsg && (
          <div className="mb-4 rounded-lg bg-red-500/10 border border-red-500/50 p-3 text-xs text-red-400 text-center">
            {errorMsg}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">
                Full Name
              </label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-3 text-slate-500" />
                <input
                  type="text"
                  required
                  placeholder="Sahil Ahmad"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-800/80 pl-9 pr-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-3 text-slate-500" />
              <input
                type="email"
                required
                placeholder="sahil@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-800/80 pl-9 pr-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-3 text-slate-500" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-800/80 pl-9 pr-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/20 mt-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? "Processing..." : isSignUp ? "Sign Up" : "Log In"}
          </button>
        </form>

        {/* Tab Switcher */}
        <div className="mt-5 text-center text-xs text-slate-400 border-t border-slate-800 pt-4">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            onClick={() => {
              setIsSignUp(!isSignUp);
              setErrorMsg("");
            }}
            className="text-blue-400 font-semibold hover:underline ml-1 cursor-pointer"
          >
            {isSignUp ? "Log In" : "Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
}