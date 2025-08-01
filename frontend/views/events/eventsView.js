export function eventCard(event) {
  return `
    <div class="event-card">
      <div class="event-content">
        <span class="event-category">${event.category}</span>
        <h3 class="event-title">${event.title}</h3>
        <p>${event.description.substring(0, 100)}...</p>
        <div class="event-details">
          <div><i class="fas fa-calendar"></i> ${event.date}</div>
          <div><i class="fas fa-clock"></i> ${event.time}</div>
          <div><i class="fas fa-map-marker-alt"></i> ${event.location}</div>
        </div>
        <div class="event-actions">
          <button class="register-btn" data-id="${event.id}">Register Now</button>
          <button class="details-btn" data-id="${event.id}">Details</button>
        </div>
      </div>
    </div>
  `;
}
