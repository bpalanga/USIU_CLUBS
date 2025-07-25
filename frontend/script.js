// DOM Elements
const eventModal = document.getElementById('eventModal');
const authModal = document.getElementById('authModal');
const closeModals = document.querySelectorAll('.close-modal');
const eventsContainer = document.getElementById('eventsContainer');
const registrationForm = document.getElementById('registrationForm');
const commentForm = document.getElementById('commentForm');
const commentsList = document.getElementById('commentsList');
const exploreBtn = document.getElementById('exploreBtn');
const authNav = document.getElementById('authNav');
const authTabs = document.querySelectorAll('.auth-tab');
const authForms = document.querySelectorAll('.auth-form');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const switchToLogin = document.getElementById('switchToLogin');
const notification = document.getElementById('notification');
const notificationMessage = document.getElementById('notificationMessage');
const loginBtn = document.getElementById('loginBtn');


// API endpoints
const API_BASE_URL = 'https://70f2f68789cb.ngrok-free.app'; // Update with your server URL
const EVENTS_API = `${API_BASE_URL}/api/events`;
const LOGIN_API = `${API_BASE_URL}/backend/login.php`;
const SIGNUP_API = `${API_BASE_URL}/backend/signup.php`;
const COMMENTS_API = `${API_BASE_URL}/backend/comments.php`;
const REGISTER_API = `${API_BASE_URL}/backend/register.php`;

// Current user state
let currentUser = null;

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    loadEvents();
    setupEventListeners();
    // checkLoginStatus();
});

function setupEventListeners() {
    // Close modals
    closeModals.forEach(btn => {
        btn.addEventListener('click', () => {
            eventModal.style.display = 'none';
            authModal.style.display = 'none';
        });
    });
    
    // Click outside modal to close
    window.addEventListener('click', (e) => {
        if (e.target === eventModal) eventModal.style.display = 'none';
        if (e.target === authModal) authModal.style.display = 'none';
    });
    
    // Explore events button
    exploreBtn.addEventListener('click', () => {
        document.querySelector('.events-section').scrollIntoView({ 
            behavior: 'smooth' 
        });
        // loadEvents();
    });
    
    // Login button
    if(loginBtn) {
        loginBtn.addEventListener('click', () => {
            authModal.style.display = 'block';
        });
    }
    
    // Auth tabs
    authTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.getAttribute('data-tab');
            
            // Update tabs
            authTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Update forms
            authForms.forEach(form => form.classList.remove('active'));
            document.getElementById(`${tabName}Form`).classList.add('active');
            
            // Update modal title
            document.getElementById('authModalTitle').textContent = 
                tabName === 'login' ? 'Login to Your Account' : 'Create a New Account';
        });
    });
    
    // Switch between login/signup
    switchToLogin.addEventListener('click', (e) => {
        e.preventDefault();
        authTabs.forEach(tab => {
            if (tab.getAttribute('data-tab') === 'login') {
                tab.click();
            }
        });
    });
    
    // Login form
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        loginUser();
    });
    
    // Signup form
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        registerUser();
    });
    
    // Registration form
    registrationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        registerForEvent();
    });
    
    // Comment form
    commentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        postComment();
    });
}
// ------------------------- load events -----------------------
// Load events from API
function loadEvents() {
    console.log("The events have been fetcged")
    fetch(EVENTS_API, {
        method: "GET",
        headers: {
            "ngrok-skip-browser-warning": true,
            "Content-Type":" application/json"
        }
        }
    )
        .then(response => response.json())
        .then(data =>renderEvents(data))
        .catch(error => {
            console.error('Error loading events:', error);
            showNotification('Failed to load events. Please try again later.', 'error');
        });

}

// Render events to the page
// -------------------------Render  events -----------------
function renderEvents(events) {
    eventsContainer.innerHTML = '';
    
    events.forEach(event => {
        const eventCard = document.createElement('div');
        eventCard.className = 'event-card';
        eventCard.innerHTML = `
            <div class="event-content">
                 <span class="event-category">${event.category}</span>
                <h3 class="event-title">${event.title}</h3>
                <p>${event.description.substring(0, 100)}...</p>
                <div class="event-details">
                    <div><i class="fas fa-calendar"></i> ${event.date}</div>
                    <div><i class="fas fa-clock"></i> ${event.time}</div>
                    <div><i class="fas fa-map-marker-alt"></i> ${event.location}</div>
                </div>
                <div class="event-actions">
                    <button class="register-btn" data-id="${event.id}">Register Now</button>
                    <button class="details-btn" data-id="${event.id}">Details</button>
                </div>
            </div>
        `;
        
        eventsContainer.appendChild(eventCard);
    });
    
    // Add event listeners to new buttons
    document.querySelectorAll('.details-btn').forEach(button => {
        button.addEventListener('click', () => {
            const eventId = button.getAttribute('data-id');
            loadEventDetails(eventId);
            eventModal.style.display = 'block';
        });
    });
    
    document.querySelectorAll('.register-btn').forEach(button => {
        button.addEventListener('click', () => {
            const eventId = button.getAttribute('data-id');
            document.getElementById('eventId').value = eventId;
            loadEventDetails(eventId);
            eventModal.style.display = 'block';
            setTimeout(() => {
                document.querySelector('.form-section').scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 300);
        });
    });
}

// Load event details
//  load event details -------------------------------------------
function loadEventDetails(eventId) {
    fetch(`${EVENTS_API}/${eventId}`,
            {
            method: "GET",
            headers: {
                "ngrok-skip-browser-warning": true,
                "Content-Type":" application/json"
            }
            }
    )
        .then(response => response.json())
        .then(data => {
            if(data.status === 'success' && data.event) {
                const event = data.event;
                document.getElementById('modalEventTitle').textContent = event.title;
                document.getElementById('modalEventDate').textContent = event.date;
                document.getElementById('modalEventTime').textContent = event.date;
                // document.getElementById('modalEventLocation').textContent = event.location;
                // document.getElementById('modalEventOrganizer').textContent = event.organizer;
                document.getElementById('modalEventDescription').textContent = event.description;
                // document.getElementById('commentEventId').value = eventId;
                
                // Load comments for this event
                // loadComments(eventId);
            } else {
                showNotification('Failed to load event details', 'error');
            }
        })
        .catch(error => {
            console.error('Error loading event details:', error);
            showNotification('Failed to load event details', 'error');
        });
}

// Load comments for an event
function loadComments(eventId) {
    fetch(`${COMMENTS_API}?event_id=${eventId}`)
        .then(response => response.json())
        .then(data => {
            commentsList.innerHTML = '';
            
            if(data.status === 'success') {
                data.comments.forEach(comment => {
                    const commentElement = document.createElement('div');
                    commentElement.className = 'comment';
                    commentElement.innerHTML = `
                        <div class="comment-avatar">${comment.name.charAt(0).toUpperCase()}</div>
                        <div class="comment-content">
                            <div class="comment-header">
                                <span class="comment-author">${comment.name}</span>
                                <span class="comment-date">${formatDate(comment.created_at)}</span>
                            </div>
                            <p class="comment-text">${comment.content}</p>
                        </div>
                    `;
                    commentsList.appendChild(commentElement);
                });
            } else {
                commentsList.innerHTML = '<p>No comments yet. Be the first to comment!</p>';
            }
        })
        .catch(error => {
            console.error('Error loading comments:', error);
            commentsList.innerHTML = '<p>Failed to load comments</p>';
        });
}

// Register for an event
function registerForEvent() {
    const eventId = document.getElementById('eventId').value;
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const studentId = document.getElementById('studentId').value;
    const department = document.getElementById('department').value;
    
    if(!fullName || !email) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    const formData = new FormData();
    formData.append('event_id', eventId);
    formData.append('full_name', fullName);
    formData.append('email', email);
    formData.append('student_id', studentId);
    formData.append('department', department);
    
    fetch(REGISTER_API, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if(data.status === 'success') {
            showNotification('Registration successful! Confirmation email sent.', 'success');
            registrationForm.reset();
        } else {
            showNotification('Registration failed: ' + data.message, 'error');
        }
    })
    .catch(error => {
        console.error('Error registering:', error);
        showNotification('Registration failed. Please try again.', 'error');
    });
}

// Post a comment
function postComment() {
    const eventId = document.getElementById('commentEventId').value;
    const name = document.getElementById('commentName').value;
    const content = document.getElementById('commentText').value;
    
    if(!name || !content) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    const formData = new FormData();
    formData.append('event_id', eventId);
    formData.append('name', name);
    formData.append('content', content);
    
    fetch(COMMENTS_API, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if(data.status === 'success') {
            // Add new comment to the list
            const newComment = document.createElement('div');
            newComment.className = 'comment';
            newComment.innerHTML = `
                <div class="comment-avatar">${name.charAt(0).toUpperCase()}</div>
                <div class="comment-content">
                    <div class="comment-header">
                        <span class="comment-author">${name}</span>
                        <span class="comment-date">Just now</span>
                    </div>
                    <p class="comment-text">${content}</p>
                </div>
            `;
            commentsList.prepend(newComment);
            
            // Reset form
            commentForm.reset();
            showNotification('Comment posted successfully!', 'success');
        } else {
            showNotification('Failed to post comment: ' + data.message, 'error');
        }
    })
    .catch(error => {
        console.error('Error posting comment:', error);
        showNotification('Failed to post comment. Please try again.', 'error');
    });
}

// User login
function loginUser() {
    const identifier = document.getElementById('loginIdentifier').value;
    const password = document.getElementById('loginPassword').value;
    
    if(!identifier || !password) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    const formData = new FormData();
    formData.append('identifier', identifier);
    formData.append('password', password);
    
    fetch(LOGIN_API, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if(data.status === 'success') {
            currentUser = data.user;
            updateAuthUI();
            authModal.style.display = 'none';
            showNotification('Login successful! Welcome back, ' + data.user.full_name, 'success');
        } else {
            showNotification('Login failed: ' + data.message, 'error');
        }
    })
    .catch(error => {
        console.error('Error logging in:', error);
        showNotification('Login failed. Please try again.', 'error');
    });
}

// User registration
function registerUser() {
    const fullName = document.getElementById('signupFullName').value;
    const studentId = document.getElementById('signupStudentId').value;
    const email = document.getElementById('signupEmail').value;
    const username = document.getElementById('signupUsername').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;
    
    if(password !== confirmPassword) {
        showNotification('Passwords do not match', 'error');
        return;
    }
    
    const formData = new FormData();
    formData.append('full_name', fullName);
    formData.append('student_id', studentId);
    formData.append('email', email);
    formData.append('username', username);
    formData.append('password', password);
    
    fetch(SIGNUP_API, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if(data.status === 'success') {
            currentUser = data.user;
            updateAuthUI();
            authModal.style.display = 'none';
            showNotification('Account created successfully! Welcome, ' + fullName, 'success');
        } else {
            showNotification('Registration failed: ' + data.message, 'error');
        }
    })
    .catch(error => {
        console.error('Error registering:', error);
        showNotification('Registration failed. Please try again.', 'error');
    });
}

// Check if user is logged in
function checkLoginStatus() {
    // In a real app, this would check session or token
    const user = localStorage.getItem('currentUser');
    if (user) {
        currentUser = JSON.parse(user);
        updateAuthUI();
    }
}

// Update UI based on login status
function updateAuthUI() {
    if (currentUser) {
        authNav.innerHTML = `
            <div class="user-info">
                <div class="user-avatar">${currentUser.full_name.charAt(0)}</div>
                <div class="nav-button" id="logoutBtn">Logout</div>
            </div>
        `;
        document.getElementById('logoutBtn').addEventListener('click', logoutUser);
    } else {
        authNav.innerHTML = '<div class="nav-button" id="loginBtn">Login / Sign Up</div>';
        document.getElementById('loginBtn').addEventListener('click', () => {
            authModal.style.display = 'block';
        });
    }
}

// Logout user
function logoutUser() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    updateAuthUI();
    showNotification('You have been logged out successfully', 'success');
}

// Show notification
function showNotification(message, type) {
    notificationMessage.textContent = message;
    notification.className = `notification ${type} show`;
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Format date for display
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}