import { create } from "zustand";

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

const DEFAULT_USER: User = {
  id: "1",
  name: "Sereti Kamau",
  handle: "@sereti_k",
  initials: "SK",
  phone: "",
  bio: "Kenyan youth | Tech enthusiast | Building zConnect for the next generation of Kenyan innovators. Connect. Empower. Grow. Together.",
  location: "Nairobi, Kenya",
  joined: "Joined May 2024",
  posts: 48,
  mbogi: 312,
  following: 189,
};

const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  user: null,

  login: (phone: string) =>
    set({
      isLoggedIn: true,
      user: { ...DEFAULT_USER, phone },
    }),

  logout: () =>
    set({
      isLoggedIn: false,
      user: null,
    }),

  updateUser: (data: Partial<User>) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...data } : null,
    })),
}));

export default useAuthStore;
