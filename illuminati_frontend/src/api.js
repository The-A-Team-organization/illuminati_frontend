import axios from "axios";

const API_BASE = "http://localhost:8000";

const client = axios.create({
  baseURL: API_BASE,
  timeout: 5000,
});

export async function verifyEntryPassword(password) {
  const res = await client.post("/api/authentific/entry/", { password });
  return res.data;
}

export async function login(email, password) {
  const res = await client.post("/api/authentific/login/", { email, password });
  return res.data;
}

export async function register(username, email, password) {
  const res = await client.post("/api/authentific/register/", {
    username,
    email,
    password,
  });
  return res.data;
}

export async function getAllRecords() {
  const res = await client.get("/api/records/all");
  return res.data;
}

export default client;
