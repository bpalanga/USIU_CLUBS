export function dashboardView(events = []) {
  return `
    <div class="dashboard--container">
      <h2 class="dashboard--title">Captain's Dashboard</h2>
      <button id="createEventBtn" data-link href="/create-event">
        Create Event
      </button> 
      <table class="dashboard--table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Date</th>
            <th>Location</th>
            <th>Registrations</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${events.length === 0 
            ? `<tr><td class="dashboard--empty" colspan="5">No events found.</td></tr>` 
            : events.map(ev => `
              <tr>
                <td>${ev.title}</td>
                <td>${ev.date}</td>
                <td>${ev.location}</td>
                <td>${ev.registrations ? ev.registrations.length : 0}</td>
                <td>
                  <button class="dashboard--btn dashboard--edit-btn delete-event-btn" data-id="${ev.id}">delete</button>
                  <button class="dashboard--btn dashboard--edit-btn edit-event-btn" data-id="${ev.id}">Edit</button>
                </td>
              </tr>
            `).join("")
          }
        </tbody>
      </table>
    </div>
  `;
}
