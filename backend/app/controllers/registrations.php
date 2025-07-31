<?php
require_once __DIR__ . '/../models/registration_model.php';
require_once __DIR__ . '/../models/event_model.php';
require_once __DIR__ . '/../models/auth_model.php';
require_once __DIR__ . '/../models/notification_model.php';

function register_for_event($event_id) {
    $data = json_decode(file_get_contents('php://input'), true);
    $name = $data['name'] ?? '';
    $email = $data['email'] ?? '';

    if (!$name || !$email) {
        http_response_code(400);
        echo json_encode(['error' => 'Name and email are required']);
        return;
    }

    // 1️⃣ Save registration
    save_registration($event_id, $name, $email);

    // 2️⃣ Get event info
    $event = fetch_event_by_id($event_id);
    if (!$event) {
        http_response_code(404);
        echo json_encode(['error' => 'Event not found']);
        return;
    }

    // 3️⃣ Create message
    $message = "$name has registered for your event: {$event['title']}";

    // 4️⃣ Notify the captain who created this event
    error_log("Notifying captain with ID: " . $event['created_by']);
    create_notification($event['created_by'], $event_id, $message);

    // 5️⃣ Notify all admins too
    $admins = get_all_admins();
    foreach ($admins as $admin) {
        create_notification($admin['id'], $event_id, $message);
    }

    echo json_encode(['message' => 'Successfully registered for the event']);
}
