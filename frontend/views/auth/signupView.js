export function signupView() {
  return `
    <h2 class="form-header">Signup as Captai</h2>
    <form id="signupForm" class="auth-form">
      <input type="email" id="signupEmail" placeholder="Email" required>
      <input type="password" id="signupPassword" placeholder="Password" required>
      <input type="text" id="signupClubName" placeholder="Club Name" required>
      <button type="submit">Signup</button>
    </form>
  `;
}
