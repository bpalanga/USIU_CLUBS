<?php
require_once __DIR__ . '/../models/registration_model.php';

function register_for_event($event_id) {
    $data = json_decode(file_get_contents('php://input'), true);
    $name = $data['name'] ?? '';
    $email = $data['email'] ?? '';

    if (!$name || !$email) {
        http_response_code(400);
        echo json_encode(['error' => 'Name and email are required']);
        return;
    }

    save_registration($event_id, $name, $email);
    echo json_encode(['message' => 'Successfully registered for the event']);
}

function get_all_registrations() {
    $registrations = fetch_all_registrations();
    header('Content-Type: application/json');
    echo json_encode($registrations);
}

function get_registration($id) {
    $registration = fetch_registration_by_id($id);

    if (!$registration) {
        http_response_code(404);
        echo json_encode(['error' => 'Registration not found']);
        return;
    }

    header('Content-Type: application/json');
    echo json_encode($registration);
}

function remove_registration($id) {
    $registration = fetch_registration_by_id($id);

    if (!$registration) {
        http_response_code(404);
        echo json_encode(['error' => 'Registration not found']);
        return;
    }

    delete_registration($id);
    echo json_encode(['message' => 'Registration cancelled']);
}

