import { create } from "zustand";

import { User } from "@/features/users";

interface Auth {
  isLoaded: boolean;
  load: () => void;
  userId: User["id"] | null;
  isLoggedIn: boolean;
  logIn: (userId: User["id"]) => void;
  logOut: () => void;
}

export const useAuthStore = create<Auth>((set) => ({
  isLoaded: false,
  load: () => set({ isLoaded: true }),
  userId: null,
  isLoggedIn: false,
  logIn: (userId) => set({ userId, isLoggedIn: true }),
  logOut: () => set({ userId: null, isLoggedIn: false }),
}));
