export function dashboardView(events = [], notifications = []) {
  return `
    <div class="dashboard--container">
      <h2 class="dashboard--title">Captain's Dashboard</h2>
      <button id="createEventBtn" data-link href="/create-event">
        Create Event
      </button> 

      <div class="dashboard--notifications">
        <h3>Notifications</h3>
        ${notifications.length === 0
          ? `<p class="dashboard--empty">No notifications.</p>`
          : `
            <ul class="notifications-list">
              ${notifications.map(n => `
                <li class="notification-item ${n.read_status === 0 ? 'unread' : ''}">
                  ${n.read_status === 0 ? '🔴 ' : ''}${n.message}
                  <span class="notification-date">(${n.created_at})</span>
                </li>
              `).join('')}
            </ul>
          `
        }
      </div>

      <table class="dashboard--table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Date</th>
            <th>Location</th>
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
             
                <td>
                  <button class="dashboard--btn dashboard--edit-btn delete-event-btn" data-id="${ev.id}">Delete</button>
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
