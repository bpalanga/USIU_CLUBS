export function eventDetailsView(event) {
  return `
    <div class="event-details--page">

      <header class="event-details--header">
        <button id="backToEvents" class="event-details--back-btn">
          <span class="event-details--back-icon">&larr;</span> Back to Events
        </button>
        <h1 class="event-details--title">${event.title}</h1>
      </header>

      <section class="event-details--meta-section">
        <ul class="event-details--meta-list">
          <li><strong>Category:</strong> ${event.category}</li>
          <li><strong>Date:</strong> ${event.date}</li>
          <li><strong>Time:</strong> ${event.time}</li>
          <li><strong>Location:</strong> ${event.location}</li>
        </ul>
      </section>

      <section class="event-details--description">
        <p>${event.description}</p>
      </section>

      <section class="event-details--comments">
        <h2 class="event-details--comments-title">Comments</h2>
        <div id="comments-container" class="event-details--comments-container">
          <p class="event-details--no-comments">No comments yet.</p>
        </div>
        <div id="comment-form-section" class="event-details--comment-form"></div>
      </section>

    </div>
  `;
}
