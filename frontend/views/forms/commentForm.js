export function commentForm(eventId) {
  return `
    <div class="comment-form">
      <h4>Leave a Comment</h4>
      <form id="commentForm">
        <input type="hidden" id="commentEventId" value="${eventId}">
        <div class="form-group">
          <label for="commentName">Name</label>
          <input type="text" id="commentName" placeholder="Your name" required>
        </div>
        <div class="form-group">
          <label for="commentText">Comment</label>
          <textarea id="commentText" placeholder="Your comment" required></textarea>
        </div>
        <button type="submit" class="submit-btn">Post Comment</button>
      </form>
    </div>
  `;
}
