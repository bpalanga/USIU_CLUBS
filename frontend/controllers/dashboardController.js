import { store } from "../data.js";
import { getCurrentUser } from "../services/authService.js";
import { dashboardView } from "../views/dashboard/dashboardView.js";

const container = document.getElementById("main");

export function renderCaptainDashboard() {
  const user = getCurrentUser();

  if (!user || user.role.toLowerCase() !== "captain") {
    container.innerHTML = `<p>Access denied. Captains only.</p>`;
    return;
  }

  // For now, filter events created by this captain (mocked with user.id)
  const captainEvents = (store.events || []).filter(ev => ev.captainId === user.id);

  container.innerHTML = dashboardView(captainEvents);
}
