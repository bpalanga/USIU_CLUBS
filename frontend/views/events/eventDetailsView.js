export function eventDetailsView(event) {
  return `
    <div class="event-details-page">
        <button id="backToEvents">&larr; Back</button>
        <h2>${event.title}</h2>
        <p><strong>Category:</strong> ${event.category}</p>
        <p><strong>Date:</strong> ${event.date}</p>
        <p><strong>Time:</strong> ${event.time}</p>
        <p><strong>Location:</strong> ${event.location}</p>
        <p>${event.description}</p>

        <h3>Comments</h3>
        <div id="comments-container">
        <p>No comments yet.</p>
        </div>

        <div id="comment-form-section"></div>

    </div>
  `;
}
