import { login, signup, getCurrentUser } from "../services/authService.js";

export function setupAuthDelegation() {
  document.body.addEventListener("submit", async (e) => {

    // LOGIN form handler
    if (e.target.id === "loginForm") {
      e.preventDefault();

      const email = document.getElementById("loginEmail").value;
      const password = document.getElementById("loginPassword").value;

      try {
        const user = await login(email, password);
        localStorage.setItem("user", JSON.stringify(user));

        alert("Login successful!");
        updateUIForAuth();
        history.pushState({}, "", "/");
        window.dispatchEvent(new PopStateEvent("popstate")); 
      } catch (err) {
        alert("Login failed: " + err.message);
      }
    }

    // SIGNUP form handler
    if (e.target.id === "signupForm") {
      e.preventDefault();

      const email = document.getElementById("signupEmail").value;
      const password = document.getElementById("signupPassword").value;
      const clubName = document.getElementById("signupClubName").value;

      try {
        const user = await signup(email, password, clubName);
        localStorage.setItem("user", JSON.stringify(user));

        alert("Signup successful!");
        updateUIForAuth();
        history.pushState({}, "", "/");
        window.dispatchEvent(new PopStateEvent("popstate"));
      } catch (err) {
        alert("Signup failed: " + err.message);
      }
    }
  });
}

export function logout() {
  localStorage.removeItem("user"); 
  alert("You have been logged out.");
  updateUIForAuth(); 
  history.pushState({}, "", "/"); 
  window.dispatchEvent(new PopStateEvent("popstate")); 
}

export function updateUIForAuth() {
  const user = getCurrentUser();
  const dashboardBtn = document.getElementById("dashboardBtn");
  const authNav = document.getElementById("authNav");
  const authUserNav = document.getElementById("authUserNav");

  if (user && user.role && user.role.toLowerCase() === "captain") {
    authUserNav.style.display = "block";
    authNav.style.display = "none";

    if (dashboardBtn) {
      dashboardBtn.style.display = "inline-block";
      dashboardBtn.onclick = () => {
        history.pushState({}, "", "/captain-dashboard");
        window.dispatchEvent(new PopStateEvent("popstate"));
      };
    }
  } else {
    authNav.style.display = "block";
    authUserNav.style.display = "none";

    if (dashboardBtn) {
      dashboardBtn.style.display = "none";
    }
  }
}
