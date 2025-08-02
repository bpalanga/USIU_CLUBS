// ===== BASE URL for API requests =====
export const baseUrl = 'https://da8ef67972d2.ngrok-free.app'

// ===== GLOBAL STORE =====
export const store = {
  events: null,
  user: null,
  my_events: []
};

// ===== Helper: Default Headers =====
export const defaultHeaders = {
  "ngrok-skip-browser-warning": true,
  "Content-Type": "application/json"
};

// ===== Helper: API Methods =====
export async function getData(url) {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: defaultHeaders,
      credentials: "include" 
    });
    if (!response.ok) throw new Error(`GET ${url} failed`);
    return await response.json();
  } catch (error) {
    console.error("GET request error:", error);
    return null;
  }
}

export async function postData(url, data) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: defaultHeaders,
      credentials: "include",
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error(`POST ${url} failed`);
    return await response.json();
  } catch (error) {
    console.error("POST request error:", error);
    return null;
  }
}

export async function putData(url, data) {
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: defaultHeaders,
      credentials: "include",
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error(`PUT ${url} failed`);
    return await response.json();
  } catch (error) {
    console.error("PUT request error:", error);
    return null;
  }
}

export async function deleteData(url) {
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: defaultHeaders,
      credentials: "include"
    });
    if (!response.ok) throw new Error(`DELETE ${url} failed`);
    return await response.json();
  } catch (error) {
    console.error("DELETE request error:", error);
    return null;
  }
}

// ===== FETCH EVENTS =====
export async function fetchEvents() {
  try {
    const data = await getData(`${baseUrl}/api/events`);
    if (data) store.events = data;
  } catch (error) {
    console.error("Failed to fetch events:", error);
  }
}

// ===== FETCH EVENT COMMENTS =====
export async function fetchComments(eventId) {
  try {
    return await getData(`${baseUrl}/api/events/${eventId}/comments`) || [];
  } catch (error) {
    console.error("Error fetching comments:", error);
    return [];
  }
}

// ===== Fetch Registrat=====
export async function fetchRegistrations(eventId) {
  try {
    return await getData(`${baseUrl}/api/events/${eventId}/registrations`) || [];
  } catch (error) {
    console.error("Error fetching registrations:", error);
    return [];
  }
}

// ===== FETCH NOTIFICATIONS =====
async function fetchNotifications() {
  try {
    const response = await fetch(`${baseUrl}/api/notifications`, {
      method: "GET",
      headers: {
        "ngrok-skip-browser-warning": true,
        "Content-Type": "application/json"
      },
      credentials: "include" 
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch notifications: ${response.status}`);
    }

    const data = await response.json();
    console.log("Notifications:", data);
    return data;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return [];
  }
}

fetchNotifications();
