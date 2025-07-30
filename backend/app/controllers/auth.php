<?php
require_once __DIR__ . '/../models/auth_model.php';

function signup() {
    $data = json_decode(file_get_contents('php://input'), true);

    $email = $data['email'] ?? null;
    $password = $data['password'] ?? null;

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

    // Hash password
    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

    // Save user to DB
    if (save_user($email, $hashedPassword)) {
        echo json_encode(['message' => 'User registered successfully']);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to register user']);
    }
}

function signin() {
    $data = json_decode(file_get_contents('php://input'), true);

    $email = $data['email'] ?? null;
    $password = $data['password'] ?? null;

    if (!$email || !$password) {
        http_response_code(400);
        echo json_encode(['error' => 'Email and password are required']);
        return;
    }

    // Get user from DB
    $user = get_user_by_email($email);

    if ($user && password_verify($password, $user['password'])) {
        echo json_encode(['message' => 'Login successful']);
    } else {
        http_response_code(401);
        echo json_encode(['error' => 'Invalid credentials']);
    }
}
