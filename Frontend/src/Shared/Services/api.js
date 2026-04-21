import axios from "axios";
import backendUrl from "../config/backendUrl";

const api = axios.create({
  baseURL: backendUrl,
});

const getAccessToken = () => {
  const rawToken = localStorage.getItem("token");
  if (!rawToken) return null;
  return rawToken.startsWith("Bearer ") ? rawToken.slice(7) : rawToken;
};

const logoutAndRedirect = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("role");
  localStorage.removeItem("userId");
  localStorage.removeItem("user");

  if (window.location.pathname !== "/auth/login") {
    window.location.href = "/auth/login";
  }
};

let isRefreshing = false;
let pendingRequests = [];

const flushPendingRequests = (error, token = null) => {
  pendingRequests.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });
  pendingRequests = [];
};

api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error?.response?.status;

    if (status !== 401 || !originalRequest || originalRequest._retry) {
      return Promise.reject(error);
    }

    if (originalRequest.url?.includes("/auth/refresh-token")) {
      logoutAndRedirect();
      return Promise.reject(error);
    }

    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      logoutAndRedirect();
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        pendingRequests.push({ resolve, reject });
      })
        .then((newToken) => {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return api(originalRequest);
        })
        .catch((refreshError) => Promise.reject(refreshError));
    }

    isRefreshing = true;

    try {
      const { data } = await axios.post(`${backendUrl}/auth/refresh-token`, {
        refreshToken,
      });

      const newAccessToken = data?.accessToken;
      if (!newAccessToken) {
        throw new Error("No access token returned from refresh endpoint");
      }

      localStorage.setItem("token", newAccessToken);
      if (data?.refreshToken) {
        localStorage.setItem("refreshToken", data.refreshToken);
      }

      flushPendingRequests(null, newAccessToken);
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return api(originalRequest);
    } catch (refreshError) {
      flushPendingRequests(refreshError, null);
      logoutAndRedirect();
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);

export default api;
