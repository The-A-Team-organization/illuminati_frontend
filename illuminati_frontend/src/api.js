import axios from "axios";

const API_BASE = "http://backend:8000";

const client = axios.create({
  baseURL: API_BASE,
  timeout: 5000,
});

export async function verifyEntryPassword(password) {
  const res = await client.post("/verify-entry/", { password });
  return res.data;
}

export async function login(email, password) {
  const res = await client.post("/login/", { email, password });
  return res.data;
}

export async function register(username, email, password) {
  const res = await client.post("/register/", { username, email, password });
  return res.data;
}

export default client;
