<?php
require_once __DIR__ . '/../models/event_model.php';

function get_all_events() {
    $events = fetch_all_events();
    header('Content-Type: application/json');
    echo json_encode($events);
}

function create_event() {
    $data = json_decode(file_get_contents('php://input'), true);
    // error_log("receved data".print_r($data,true));
    save_event($data);
    echo json_encode(['message' => 'Event created successfully']);
}

function get_event($id) {
    $event = fetch_event_by_id($id);
    if ($event) {
        header('Content-Type: application/json');
        echo json_encode($event);
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Event not found']);
    }
}

function edit_event($id) {
    $data = json_decode(file_get_contents('php://input'), true);
    update_event($id, $data);
    echo json_encode(['message' => 'Event updated successfully']);
}

function remove_event($id) {
    delete_event($id);
    echo json_encode(['message' => 'Event deleted successfully']);
}
