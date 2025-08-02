import { store, getData } from "../data.js";
import { getCurrentUser } from "../services/authService.js";
import { dashboardView } from "../views/dashboard/dashboardView.js";
import { baseUrl } from "../data.js";

const container = document.getElementById("main");

export async function renderCaptainDashboard() {
  const user = getCurrentUser();

  if (!user || user.role.toLowerCase() !== "captain") {
    container.innerHTML = `<p>Access denied. Captains only.</p>`;
    return;
  }

  const captainEvents = (store.events || []).filter(ev => ev.created_by === user.id);

 
  let notifications = [];
  try {
    notifications = await getData(`${baseUrl}/api/notifications`);
  } catch (err) {
    console.error("Failed to load notifications:", err);
  }

  container.innerHTML = dashboardView(captainEvents, notifications || []);
}
