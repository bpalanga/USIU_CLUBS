import { renderEventList, renderEventDetails } from "./controllers/eventsController.js";
import { renderCaptainDashboard } from "./controllers/dashboardController.js"; 
import { fetchEvents, store } from "./data.js";
import { loginView } from "./views/auth/loginView.js";
import { signupView } from "./views/auth/signupView.js";


// todo: remv the hereo and put main 
const container = document.getElementById("main"); 

export async function handleRouting() {
  const path = window.location.pathname;

  // Event details route
  if (path.startsWith("/event/")) {
    if (!store.events) {
      await fetchEvents();
    }
    const eventId = path.split("/event/")[1];
    renderEventDetails(eventId);
    return;
  }

  // Auth routes
  if (path === "/login") {
    container.innerHTML = loginView();
    return;
  }

  if (path === "/signup") {
    container.innerHTML = signupView();
    return;
  }

  // Captain dashboard route
  if (path === "/captain-dashboard") {
    if (!store.events) {
      await fetchEvents();
    }
    renderCaptainDashboard();
    return;
  }

  // Default: event list
  renderEventList();
}
