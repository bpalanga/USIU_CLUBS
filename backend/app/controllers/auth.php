<?php
require_once __DIR__ . '/../models/auth_model.php';
function signup() {
    $data = json_decode(file_get_contents('php://input'), true);

    $email = $data['email'] ?? null;
    $password = $data['password'] ?? null;
    $role = $data['role'] ?? 'captain'; // Default to captain unless specified
    $club_name = $data['club_name'] ?? null;

    // Validate email format: only something@events.ac.ke
    if (!$email || !preg_match('/^[a-zA-Z0-9._%+-]+@events\.ac\.ke$/', $email)) {
        http_response_code(400);
        echo json_encode(['error' => 'Email must be a valid events.ac.ke address']);
        return;
    }

    if (!$password) {
        http_response_code(400);
        echo json_encode(['error' => 'Password is required']);
        return;
    }

    if ($role === 'captain' && !$club_name) {
        http_response_code(400);
        echo json_encode(['error' => 'Club name is required for captains']);
        return;
    }

    // Hash password
    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

    // Save user to DB
    if (save_user($email, $hashedPassword, $role, $club_name)) {
        echo json_encode(['message' => 'User registered successfully']);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to register user']);
    }
}

function signin() {

    $data = json_decode(file_get_contents('php://input'), true);
    $email = $data['email'] ?? '';
    $password = $data['password'] ?? '';

    if (!$email || !$password) {
        http_response_code(400);
        echo json_encode(['error' => 'Email and password are required']);
        return;
    }

    // Fetch user by email
    $user = get_user_by_email($email);

    if (!$user || !password_verify($password, $user['password'])) {
        http_response_code(401);
        echo json_encode(['error' => 'Invalid credentials']);
        return;
    }

    // Store user data in session
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['role'] = $user['role']; // captain or admin
    $_SESSION['club_name'] = $user['club_name'] ?? null;

    echo json_encode([
        'message' => 'Signin successful',
        'user' => [
            'id' => $user['id'],
            'email' => $user['email'],
            'role' => $user['role'],
            'club_name' => $user['club_name'] ?? null
        ]
    ]);
}
function signout() {
    // Start the session so we can destroy it
    // Remove all session variables
    // Destroy the session completely
    session_start(); 
    session_unset(); 
    session_destroy(); 

    echo json_encode(['message' => 'Signed out successfully']);
}


