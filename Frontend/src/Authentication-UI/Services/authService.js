import axios from "axios";
import backendUrl from "../../Shared/config/backendUrl";

const API_URL = `${backendUrl}/auth`;

const authService = {
  // REGISTER
  register: (userData) => axios.post(`${API_URL}/register`, userData),

  // VERIFY OTP
  verifyOTP: (email, otp, purpose = "register") =>
    axios.post(`${API_URL}/verify-otp`, { email, otp, purpose }),

  // RESEND OTP
  resendOTP: (email) => axios.post(`${API_URL}/resend-otp`, { email }),

  // FORGOT PASSWORD
  forgotPassword: (email) => axios.post(`${API_URL}/forgot-password`, { email }),

  // LOGIN
  login: async (credentials) => {
    const response = await axios.post(`${API_URL}/login`, credentials);

    const data = response.data;

    // ✅ Store required data
    if (data.accessToken) {
      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("role", data?.user?.role || "");
      localStorage.setItem("userId", data?.user?._id || "");
    }

    return data;
  },

  // LOGOUT
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
  },

  // RESET PASSWORD
  resetPassword: (data) => axios.post(`${API_URL}/reset-password`, data),

  // GET CURRENT USER (from localStorage)
  getCurrentUser: () => {
    const token = localStorage.getItem("token");

    if (!token) return null;

    return {
      token,
      role: localStorage.getItem("role"),
      userId: localStorage.getItem("userId"),
      fullName: localStorage.getItem("fullName"),
    };
  },

  // CHECK LOGIN STATUS
  isAuthenticated: () => {
    return !!localStorage.getItem("token");
  },
};

export default authService;
