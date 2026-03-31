import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

const authService = {
  // REGISTER
  register: (userData) => axios.post(`${API_URL}/register`, userData),

  // VERIFY OTP
  verifyOTP: (email, otp) =>
    axios.post(`${API_URL}/verify-otp`, { email, otp }),

  // RESEND OTP
  resendOTP: (email) => axios.post(`${API_URL}/resend-otp`, { email }),

  // LOGIN
  login: async (credentials) => {
    const response = await axios.post(`${API_URL}/login`, credentials);

    const data = response.data;

    // ✅ Store required data
    if (data.accessToken) {
      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("role", data.role);
      localStorage.setItem("userId", data.userId);
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
