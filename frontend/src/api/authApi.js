import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

const authClient = axios.create({
  baseURL: API_BASE_URL,
});

const TOKEN_KEY = "token";
const USER_KEY = "user";

authClient.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const saveAuth = ({ token, user }) => {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  }
  if (user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
};

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const getUser = () => {
  const raw = localStorage.getItem(USER_KEY);
  return raw ? JSON.parse(raw) : null;
};

export const isLoggedIn = () => Boolean(getToken());

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

export const registerUser = async ({
  fullName,
  email,
  password,
  confirmPassword,
}) => {
  const { data } = await authClient.post("/auth/register", {
    fullName,
    email,
    password,
    confirmPassword,
  });
  return data;
};

export const loginUser = async ({ email, password }) => {
  const { data } = await authClient.post("/auth/login", { email, password });
  return data;
};

export default authClient;
