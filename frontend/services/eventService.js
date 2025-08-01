
import { baseUrl } from ".data.js";
const headers = {
  "ngrok-skip-browser-warning": true,
  "Content-Type": "application/json"
};

export async function createEvent(eventData) {
  const res = await fetch(`${baseUrl}/api/events`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(eventData)
  });

  if (!res.ok) {
    throw new Error("Failed to create event");
  }

  return res.json();
}
