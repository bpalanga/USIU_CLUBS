<?php
require_once __DIR__ . '/../models/event_model.php';

function get_all_events() {
    $events = fetch_all_events();
    header('Content-Type: application/json');
    echo json_encode($events);
}

function create_event() {
    $data = json_decode(file_get_contents('php://input'), true);
    save_event($data);
    echo json_encode(['message' => 'Event created successfully']);
}
