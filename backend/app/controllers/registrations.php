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
