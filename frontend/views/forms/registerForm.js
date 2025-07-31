export function registerForm(eventId) {
  return `
    <div id="popup" class="popup-overlay">
      <div class="popup-content">
        <span id="closePopup" class="popup-close">&times;</span>
        <div class="form-section">
          <h3 class="form-title">Register for this Event</h3>
          <form id="registrationForm">
            <input type="hidden" id="eventId" value="${eventId}">
            
            <div class="form-group">
              <label for="fullName">Name</label>
              <input type="text" id="fullName" placeholder="Enter your full name" required>
            </div>
            
            <div class="form-group">
              <label for="email">Email Address</label>
              <input type="email" id="email" placeholder="Enter your email" required>
            </div>
            
            <button type="submit" class="submit-btn">Register Now</button>
          </form>
        </div>
      </div>
    </div>
  `;
}
