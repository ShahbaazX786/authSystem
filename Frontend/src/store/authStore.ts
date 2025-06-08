import axios from "axios";
import { create } from "zustand";

const API_URL = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;
export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: false,

  signup: async (email: string, password: string, name: string) => {
    set({ isLoading: true, error: "Unknown Error Occured" });
    try {
      const response = await axios.post(`${API_URL}/signup`, {
        email,
        password,
        name,
      });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error: error?.response?.data?.message || "Error Signing Up",
        isLoading: false,
      });
      throw error;
    }
  },

  verifyEmail: async (otp: string) => {
    set({ isLoading: true, error: "Unknown Error Occured" });
    try {
      const response = await axios.post(`${API_URL}/verifyOtp`, { otp });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error: error?.response?.data?.message || "Error Verifying Email",
        isLoading: false,
      });
      throw error;
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/check-auth`);
      set({
        user: response.data.user,
        isAuthenticated: true,
        isCheckingAuth: false,
      });
    } catch (error: any) {
      set({
        error: null,
        isAuthenticated: false,
        isCheckingAuth: false,
      });
    }
  },
}));
