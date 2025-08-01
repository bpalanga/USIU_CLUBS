export function dashboardView(events = []) {
  return `
    <div>
      <h2>Captain's Dashboard</h2>
      <table border="1" cellpadding="8">
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
            ? `<tr><td colspan="5">No events found.</td></tr>` 
            : events.map(ev => `
              <tr>
                <td>${ev.title}</td>
                <td>${ev.date}</td>
                <td>${ev.location}</td>
                <td>${ev.registrations ? ev.registrations.length : 0}</td>
                <td>
                  <button class="view-registrations-btn" data-id="${ev.id}">View Registrations</button>
                  <button class="edit-event-btn" data-id="${ev.id}">Edit</button>
                </td>
              </tr>
            `).join("")
          }
        </tbody>
      </table>
    </div>
  `;
}
