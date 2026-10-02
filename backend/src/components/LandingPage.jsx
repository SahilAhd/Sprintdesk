import React from "react";
import LandingNavbar from "./LandingNavbar";
import LandingHero from "./LandingHero";

export default function LandingPage({ onOpenAuth }) {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-between text-slate-100">
      {/* Top Header Navbar */}
      <LandingNavbar onOpenAuth={onOpenAuth} />

      {/* Main Hero Section & Feature Cards */}
      <LandingHero onOpenAuth={onOpenAuth} />

      {/* Footer */}
      <footer className="border-t border-slate-800 py-6 text-center text-xs text-slate-500">
        © 2026 Sprintdesk. Built by Sahil Ahmad, Justsahilforbusiness@gmail.com.
      </footer>
    </div>
  );
}