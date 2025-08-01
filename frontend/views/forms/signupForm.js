export function signupForm() {
  return `
    <div class="auth-form">
      <h2>Captain Signup</h2>
      <form id="signupForm">
        <input type="email" id="signupEmail" placeholder="Email" required>
        <input type="password" id="signupPassword" placeholder="Password" required>
        <input type="text" id="signupClubName" placeholder="Club Name" required>
        <button type="submit">Signup</button>
      </form>
    </div>
  `;
}
