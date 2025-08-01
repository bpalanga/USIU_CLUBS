export function loginView() {
  return `
    <h2 class="form-header ">Captain Login</h2>
    <form id="loginForm" class="auth-form">
      <input type="email" id="loginEmail" placeholder="Email" required>
      <input type="password" id="loginPassword" placeholder="Password" required>
      <button type="submit">Login</button>
    </form>
  `;
}
