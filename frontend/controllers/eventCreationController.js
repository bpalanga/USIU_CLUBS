import { getCurrentUser } from "../services/authService.js";
import { createEventForm } from "../views/forms/createEventForm.js"; 

export function setupEventCreation() {
  document.body.addEventListener("click", (e) => {
    if (e.target.id === "createEventBtn") {
        console.log("Create Event button clicked");
      e.preventDefault();

      const user = getCurrentUser();
      if (!user || user.role.toLowerCase() !== "captain") {
        alert("Only captains can create events!");
        return;
      }

      // === popus handler
      const existingPopup = document.getElementById("popup");
      if (existingPopup) existingPopup.remove();

      
      document.body.insertAdjacentHTML("beforeend", createEventForm());
      document.getElementById("closePopup").addEventListener("click", () => {
        document.getElementById("popup").remove();
      });


      // Handle form submission
      document.getElementById("createEventForm").addEventListener("submit", (ev) => {
        ev.preventDefault();

        const data = {
          title: document.getElementById("eventTitle").value,
          description: document.getElementById("eventDescription").value,
          category: document.getElementById("eventCategory").value,
          date: document.getElementById("eventDate").value,
          time: document.getElementById("eventTime").value,
          location: document.getElementById("eventLocation").value
        };

        console.log("Creating event:", data);

        // TODO: Send to API here...

        document.getElementById("popup").remove();
      });
    }
  });
}
