import { handleRouting } from "./router.js";
import { setupEventDelegation } from "./controllers/eventsController.js";
import { setupEventCreation } from "./controllers/eventCreationController.js";
import { setupAuthDelegation, updateUIForAuth } from "./controllers/authController.js";

// SPA navigation
document.body.addEventListener("click", (e) => {
  if (e.target.matches("[data-link]")) {
    e.preventDefault();
    history.pushState({}, "", e.target.href);
    handleRouting();
    // === Update UI based on auth state logided in or not ====
    updateUIForAuth();
  }
});

window.addEventListener("popstate", () => {
  handleRouting();
  updateUIForAuth();
});

setupEventDelegation();
setupAuthDelegation();
setupEventCreation();
updateUIForAuth();
handleRouting();

