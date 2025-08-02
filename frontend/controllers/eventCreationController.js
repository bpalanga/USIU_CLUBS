import { getCurrentUser } from "../services/authService.js";
import { createEventForm } from "../views/forms/createEventForm.js";
import { baseUrl, postData, putData, deleteData,defaultHeaders } from "../data.js";
import { renderEventList } from "./eventsController.js";

export function setupEventCreation() {
  document.body.addEventListener("click", async (e) => {

    // CREATE EVENT
    if (e.target.id === "createEventBtn") {
      e.preventDefault();

      const user = getCurrentUser();
      if (!user || user.role.toLowerCase() !== "captain") {
        alert("Only captains can create events!");
        return;
      }

      openEventForm();
      document.getElementById("createEventForm").addEventListener("submit", async (ev) => {
        ev.preventDefault();
        const eventData = getFormData();
        await postData(`${baseUrl}/api/events`, eventData);
        alert("Event created successfully!");
        document.getElementById("popup").remove();
      });
    }

    // EDIT EVENT
    if (e.target.classList.contains("edit-event-btn")) {
      const eventId = parseInt(e.target.dataset.id, 10);
      // console.log(`${baseUrl}/api/events/${eventId}`);
     
      const res = await fetch(`${baseUrl}/api/events/${eventId}`,{mathod: "GET",headers:defaultHeaders});
      if (!res.ok) {
        alert("Failed to fetch event for editing");
        return;
      }
      const event = await res.json();
      // console.log("Editing event:", event);

      openEventForm(event);
      document.getElementById("createEventForm").addEventListener("submit", async (ev) => {
        ev.preventDefault();
        const updatedEventData = getFormData();
        await putData(`${baseUrl}/api/events/${eventId}`, updatedEventData);
        alert("Event updated successfully!");
        document.getElementById("popup").remove();
      });
    }

    // DELETE EVENT
    if (e.target.classList.contains("delete-event-btn")) {
      const eventId = e.target.dataset.id;
      if (confirm("Are you sure you want to delete this event?")) {
        await deleteData(`${baseUrl}/api/events/${eventId}`);
        alert("Event deleted successfully!");
      }
      store.events = store.events.filter(ev => ev.id !== eventId);
      renderEventList();
    }
  });
}

// === Helper functions ===
function openEventForm(event = {}) {
  const existingPopup = document.getElementById("popup");
  if (existingPopup) existingPopup.remove();

  document.body.insertAdjacentHTML("beforeend", createEventForm());

  document.getElementById("eventTitle").value = event.title || "";
  document.getElementById("eventDescription").value = event.description || "";
  document.getElementById("eventCategory").value = event.category || "";
  document.getElementById("eventDate").value = event.date || "";
  document.getElementById("eventTime").value = event.time ? event.time.slice(0, 5) : "";
  document.getElementById("eventLocation").value = event.location || "";

  document.getElementById("closePopup").addEventListener("click", () => {
    document.getElementById("popup").remove();
  });
}

function getFormData() {
  let timeValue = document.getElementById("eventTime").value;
  if (timeValue.length === 5) timeValue += ":00";
  return {
    title: document.getElementById("eventTitle").value,
    description: document.getElementById("eventDescription").value,
    category: document.getElementById("eventCategory").value,
    date: document.getElementById("eventDate").value,
    time: timeValue,
    location: document.getElementById("eventLocation").value
  };
}
