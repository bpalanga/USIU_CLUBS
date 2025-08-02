import { baseUrl } from "../data.js";
const headers = {
  "ngrok-skip-browser-warning": "true",
  "Content-Type": "application/json"
};

export async function login(email, password) {
  const res = await fetch(`${baseUrl}/api/auth/signin`, {
    method: "POST",
    headers,
    credentials: "include",
    body: JSON.stringify({ email, password })
  });

  if (!res.ok) {
    throw new Error("Invalid credentials");
  }

  const data = await res.json();
  return data.user;
}

export async function signup(email, password, club_name) {
  const res = await fetch(`${baseUrl}/api/auth/signup`, {
    method: "POST",
    headers,
    credentials: "include",
    body: JSON.stringify({ email, password, club_name })
  });

  if (!res.ok) {
    throw new Error("Signup failed");
  }

  const data = await res.json();
  return data.user; 
}

export function getCurrentUser() {
  const userStr = localStorage.getItem("user");
  return userStr ? JSON.parse(userStr) : null;
}
