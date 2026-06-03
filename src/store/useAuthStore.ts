import { create } from "zustand";

// ─── Types ────────────────────────────────────────────────────
type User = {
  id: string;
  name: string;
  handle: string;
  initials: string;
  phone: string;
  bio: string;
  location: string;
  joined: string;
  posts: number;
  mbogi: number;
  following: number;
};

type AuthState = {
  isLoggedIn: boolean;
  user: User | null;
  login: (phone: string) => void;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
};

// ─── Default User ─────────────────────────────────────────────
const DEFAULT_USER: User = {
  id: "1",
  name: "",
  handle: "",
  initials: "",
  phone: "",
  bio: "",
  location: "",
  joined: "",
  posts: 0,
  mbogi: 0,
  following: 0,
};

// ─── Store ────────────────────────────────────────────────────
const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  user: null,

  login: (phone: string) =>
    set((state) => ({
      isLoggedIn: true,
      user: state.user ? { ...state.user, phone } : { ...DEFAULT_USER, phone },
    })),

  logout: () =>
    set({
      isLoggedIn: false,
      user: null,
    }),

  updateUser: (data: Partial<User>) =>
    set((state) => ({
      user: state.user
        ? { ...state.user, ...data }
        : { ...DEFAULT_USER, ...data },
    })),
}));

export default useAuthStore;
