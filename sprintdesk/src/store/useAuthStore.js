import { create } from "zustand";
import { persist } from "zustand/middleware";

const API_URL = "/api/auth";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      // REGISTER NEW USER TO MYSQL
      register: async (name, email, password) => {
        try {
          const res = await fetch(`${API_URL}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password }),
          });

          const data = await res.json();
          if (!res.ok) throw new Error(data.message || "Registration failed");

          set({ user: data.user, token: data.token, isAuthenticated: true });
          return { success: true };
        } catch (error) {
          return { success: false, message: error.message };
        }
      },

      // LOGIN USER FROM MYSQL
      login: async (email, password) => {
        try {
          const res = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          });

          const data = await res.json();
          if (!res.ok) throw new Error(data.message || "Login failed");

          set({ user: data.user, token: data.token, isAuthenticated: true });
          return { success: true };
        } catch (error) {
          return { success: false, message: error.message };
        }
      },

      // LOGOUT USER
      logout: () => set({ user: null, token: null, isAuthenticated: false }),
    }),
    {
      name: "auth-storage", // Saves user session in localStorage
    }
  )
);