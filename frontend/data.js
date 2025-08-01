// Base_url for API requests
export const baseUrl = 'https://a55bff6dde79.ngrok-free.app'



export const store = {
  events:null,
  user: null,
  my_events:[],
}

// Events endpoints
// ======= FETCH EVENTS =======
export async function fetchEvents() {
  try {
    const response = await fetch(`${baseUrl}/api/events`,{
        method: "GET",
        headers: {
            "ngrok-skip-browser-warning": true,
            "Content-Type":" application/json"
        }
        }
    )
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const data = await response.json()
    store.events = data
  } catch (error) {
    console.error('Failed to fetch events:', error)
  }
}
// ======= FETCH REGISTRATION   =======

// ======= FETCH EVENT COMMENTS =======
export async function fetchComments(eventId) {
  try {
    const response = await fetch(`${baseUrl}/api/events/${eventId}/comments`, {
      method: "GET",
      headers: {
        "ngrok-skip-browser-warning": true,
        "Content-Type": "application/json"
      }
    });
    if (!response.ok) {
      throw new Error('Failed to fetch comments');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching comments:', error);
    return [];
  }
}


