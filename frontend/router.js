import { renderEventList, renderEventDetails } from "./controllers/eventsController.js";
import { renderCaptainDashboard } from "./controllers/dashboardController.js";
import { fetchEvents, store } from "./data.js";
import { loginView } from "./views/auth/loginView.js";
import { signupView } from "./views/auth/signupView.js";

const container = document.getElementById("main");

export async function handleRouting() {
  const path = window.location.pathname;

  // Event details
  if (path.startsWith("/event/")) {
    if (!store.events) {
      await fetchEvents();
    }
    const eventId = path.split("/event/")[1];
    renderEventDetails(eventId);
    return;
  }

  // LOGIN as popup
  if (path === "/login") {
    const existingPopup = document.getElementById("popup");
    if (existingPopup) existingPopup.remove();
    document.body.insertAdjacentHTML("beforeend", loginView());

   
    document.getElementById("closePopup").addEventListener("click", () => {
      document.getElementById("popup").remove();
      history.pushState({}, "", "/");
    });
    return; 
  }

  // SIGNUP as popup
  if (path === "/signup") {
    const existingPopup = document.getElementById("popup");
    if (existingPopup) existingPopup.remove();
    document.body.insertAdjacentHTML("beforeend", signupView());

    document.getElementById("closePopup").addEventListener("click", () => {
      document.getElementById("popup").remove();
      history.pushState({}, "", "/");
    });
    return;
  }


  if (path === "/captain-dashboard") {
    if (!store.events) {
      await fetchEvents();
    }
    renderCaptainDashboard();
    return;
  }

  // Default 
  renderEventList();
}
