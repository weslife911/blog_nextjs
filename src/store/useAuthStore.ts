import { axiosInstance } from "@/lib/axios";
import { LoginReturnType } from "@/types/LoginReturnType";
import { SignupReturnType } from "@/types/SignupReturnTpye";
import type { AuthenticatedUser, CreateUser, LoginUser } from "@/types/user";
import { create } from "zustand";

interface AuthStore {
  authUser: AuthenticatedUser | null;
  checkAuth: () => void;
  login: (data: LoginUser) => Promise<LoginReturnType>;
  signup: (data: CreateUser) => Promise<SignupReturnType>;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  authUser: null,
  checkAuth: async() => {
        const token = localStorage.getItem("startup_auth_token");
        const response = await axiosInstance.get(`/auth/check?auth_token=${token}`);
        set({ authUser: response.data.user });
        return response.data;
    },
  login: async (data: LoginUser) => {
    const response = await axiosInstance.post("/auth/login", data);
    if (response.data.success) {
      localStorage.setItem("startup_auth_token", response.data.token);
      set({ authUser: response.data.user });
    }
    return response.data;
  },
  signup: async (data: CreateUser) => {
    const response = await axiosInstance.post("/auth/register", data);
    if (response.data.success) {
      localStorage.setItem("startup_auth_token", response.data.token);
      set({ authUser: response.data.newUser });
    }
    return response.data;
  },
  logout: () => {
    localStorage.removeItem("startup_auth_token");
    set({ authUser: null });
  }
}));
