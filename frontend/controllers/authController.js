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


export function updateUIForAuth() {
  const user = getCurrentUser();
  const createEventBtn = document.getElementById("createEventBtn");
  const dashboardBtn = document.getElementById("dashboardBtn");

  if (createEventBtn) {
    if (user && user.role && user.role.toLowerCase() === "captain") {
      createEventBtn.style.display = "inline-block";
    } else {
      createEventBtn.style.display = "none";
    }
  }

  if (dashboardBtn) {
    if (user && user.role && user.role.toLowerCase() === "captain") {
      dashboardBtn.style.display = "inline-block";

      dashboardBtn.addEventListener("click", () => {
        history.pushState({}, "", "/captain-dashboard");
        window.dispatchEvent(new PopStateEvent("popstate"));
      });
    } else {
      dashboardBtn.style.display = "none";
    }
  }
}


