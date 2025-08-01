import { fetchEvents, store, fetchComments, postData, baseUrl } from "../data.js";
import { eventCard } from "../views/events/eventsView.js";
import { registerForm } from "../views/forms/registerForm.js";
import { eventDetailsView } from "../views/events/eventDetailsView.js";
import { commentForm } from "../views/forms/commentForm.js";

const eventsContainer = document.getElementById("events-container");
const container = document.getElementById("main");

export async function renderEventList() {
  if (!store.events) {
    await fetchEvents();
  }
  eventsContainer.innerHTML = store.events.map(event => eventCard(event)).join("");
}

export async function renderEventDetails(eventId) {
  const event = store.events?.find(ev => ev.id == eventId);
  if (!event) {
    container.innerHTML = `<p>Event not found.</p>`;
    return;
  }

  container.innerHTML = eventDetailsView(event);

  // Load comments
  const comments = await fetchComments(eventId);
  document.getElementById("comments-container").innerHTML = comments
    .map(c => `
      <div class="event-details--comment-card">
        <div class="event-details--comment-header">
          <span class="event-details--comment-author">${c.name}</span>
        </div>
        <div class="event-details--comment-body">
          ${c.comment}
        </div>
      </div>
    `).join("");

  // Comment form
  document.getElementById("comment-form-section").innerHTML = commentForm(eventId);
  document.getElementById("commentForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = {
      eventId,
      name: document.getElementById("commentName").value,
      comment: document.getElementById("commentText").value
    };
    await postData(`${baseUrl}/api/events/${eventId}/comments`, data);
    renderEventDetails(eventId);
  });
}

export function setupEventDelegation() {
  container.addEventListener("click", (e) => {
    // Register button
    if (e.target.classList.contains("register-btn")) {
      const eventId = e.target.dataset.id;
      const existingPopup = document.getElementById("popup");
      if (existingPopup) existingPopup.remove();

      document.body.insertAdjacentHTML("beforeend", registerForm(eventId));
      document.getElementById("closePopup").addEventListener("click", () => {
        document.getElementById("popup").remove();
      });

      document.getElementById("registrationForm").addEventListener("submit", (ev) => {
        ev.preventDefault();
        const data = {
          eventId,
          name: document.getElementById("fullName").value,
          email: document.getElementById("email").value
        };
        console.log("Submitting registration:", data);
        document.getElementById("popup").remove();
      });
    }

    // View details
    if (e.target.classList.contains("details-btn")) {
      const eventId = e.target.dataset.id;
      history.pushState({}, "", `/event/${eventId}`);
      renderEventDetails(eventId);
    }
  });
}
