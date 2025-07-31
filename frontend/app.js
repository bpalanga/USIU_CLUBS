import { fetchEvents, store,fetchComments } from "./data.js";
import { eventCard } from "./views/eventsView.js";
import { registerForm } from "./views/forms/registerForm.js";
import { eventDetailsView } from "./views/eventDetailsView.js";
import { commentForm } from "./views/forms/commentForm.js"; // ✅ import comment form

const container = document.getElementById("events-container");

// Render list of events
async function renderEventList() {
  if (!store.events) {
    await fetchEvents();
  }
  container.innerHTML = store.events.map(event => eventCard(event)).join("");
}

// Render event details
async function renderEventDetails(eventId) {
  const event = store.events.find(ev => ev.id == eventId);
  if (!event) {
    container.innerHTML = `<p>Event not found.</p>`;
    return;
  }

  // Render main details
  container.innerHTML = eventDetailsView(event);

  // ✅ Load existing comments
  const commentsContainer = document.getElementById("comments-container");
  commentsContainer.innerHTML = `<p>Loading comments...</p>`;
  
  const comments = await fetchComments(eventId);
  if (comments.length === 0) {
    commentsContainer.innerHTML = `<p>No comments yet.</p>`;
  } else {
    console.log("Fetched comments:", comments);
    commentsContainer.innerHTML = comments.map(c => `
      <div class="comment">
        <strong>${c.name}</strong>
        <p>${c.comment}</p>
      </div>
    `).join("");
  }

  // ✅ Load comment form
  document.getElementById("comment-form-section").innerHTML = commentForm(eventId);

  // ✅ Handle comment submission
  document.getElementById("commentForm").addEventListener("submit", async (ev) => {
    ev.preventDefault();
    const data = {
      eventId,
      name: document.getElementById("commentName").value,
      comment: document.getElementById("commentText").value
    };
    console.log("Submitting comment:", data);
    // TODO: send to API later
    document.getElementById("commentForm").reset();
  });

  // Back button
  document.getElementById("backToEvents").addEventListener("click", () => {
    history.pushState({}, "", "/");
    renderEventList();
  });
}

// Handle routing based on URL
async function handleRouting() {
  const path = window.location.pathname;
  if (path.startsWith("/event/")) {
    if (!store.events) {
      await fetchEvents();
    }
    const eventId = path.split("/event/")[1];
    renderEventDetails(eventId);
  } else {
    renderEventList();
  }
}

// Event delegation for both Register + Details buttons
container.addEventListener("click", (e) => {
  // Handle register button
  if (e.target.classList.contains("register-btn")) {
    const eventId = e.target.dataset.id;

    // Remove existing popup if any
    const existingPopup = document.getElementById("popup");
    if (existingPopup) existingPopup.remove();

    // Insert popup HTML
    document.body.insertAdjacentHTML("beforeend", registerForm(eventId));

    // Close popup
    document.getElementById("closePopup").addEventListener("click", () => {
      document.getElementById("popup").remove();
    });

    // Submit form
    document.getElementById("registrationForm").addEventListener("submit", (ev) => {
      ev.preventDefault();
      const data = {
        eventId,
        name: document.getElementById("fullName").value,
        email: document.getElementById("email").value
      };
      console.log("Submitting registration:", data);
      // TODO: send to API
      document.getElementById("popup").remove();
    });
  }

  // Handle details button
  if (e.target.classList.contains("details-btn")) {
    const eventId = e.target.dataset.id;
    history.pushState({}, "", `/event/${eventId}`);
    renderEventDetails(eventId);
  }
});

// Listen for browser back/forward
window.addEventListener("popstate", handleRouting);

// Initial load
await handleRouting();
