export function signupView() {
  return `
    <div id="popup" class="popup-overlay">
      <div class="popup-content">
        <span id="closePopup" class="popup-close">&times;</span>
        <div class="form-section">
          <h2 class="form-header">Signup as Captain</h2>
          <form id="signupForm" class="auth-form">
            <input type="email" id="signupEmail" placeholder="Email" required>
            <input type="password" id="signupPassword" placeholder="Password" required>
            <input type="text" id="signupClubName" placeholder="Club Name" required>
            <button type="submit">Signup</button>
          </form>
        </div>
      </div>
    </div>
  `;
}
