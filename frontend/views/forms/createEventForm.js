export function createEventForm() {
  return `
    <div id="popup" class="popup-overlay">
      <div class="popup-content">
        <button id="closePopup" class="close-btn">&times;</button>
        <h2>Create New Event</h2>
        <form id="createEventForm" class="event-form">
          <input type="text" id="eventTitle" placeholder="Event Title" required />
          <textarea id="eventDescription" placeholder="Event Description" required></textarea>
          <input type="text" id="eventCategory" placeholder="Category" required />
          <input type="date" id="eventDate" required />
          <input type="time" id="eventTime" required />
          <input type="text" id="eventLocation" placeholder="Location" required />
          <button type="submit">Create Event</button>
        </form>
      </div>
    </div>
  `;
}
