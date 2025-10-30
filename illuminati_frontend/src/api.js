import axios from "axios";
import { getAuthToken } from "./auth";

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

export async function createRecord(data) {
  const res = await client.post("/api/records/create", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
}

export async function getRecordById(id) {
  const token = getAuthToken();
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const res = await client.get(`/api/records/${id}`, { headers });
  return res.data;
}

export async function likeRecord(recordId) {
  const token = getAuthToken();
  const res = await client.post(
    `/api/records/${recordId}/like/`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
}

export async function unlikeRecord(recordId) {
  const token = getAuthToken();
  const res = await client.post(
    `/api/records/${recordId}/unlike/`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
}


export async function eraseAllRecords() {
  const token = getAuthToken();
  const res = await client.post(
    "/api/records/erase",
    {},
    { headers: { Authorization: `Bearer ${token}` } },
  );
  return res.data;
}

export async function downloadRecordsBackup() {
  const response = await client.get("/api/snapshot/download/", {
    responseType: "blob",
  });
  return response.data;
}

export async function restoreRecordsBackup(data) {
  const response = await client.post("/api/snapshot/upload/", data);
  return response.data;
}

export default client;
