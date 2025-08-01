export function loginView() {
  return `
    <div id="popup" class="popup-overlay">
      <div class="popup-content">
        <span id="closePopup" class="popup-close">&times;</span>
        <div class="form-section">
          <h2 class="form-header">Captain Login</h2>
          <form id="loginForm" class="auth-form">
            <input type="email" id="loginEmail" placeholder="Email" required>
            <input type="password" id="loginPassword" placeholder="Password" required>
            <button type="submit" class="submit-btn">Login</button>
          </form>
        </div>
      </div>
    </div>
  `;
}
