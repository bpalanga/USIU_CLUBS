<?php
require_once __DIR__ . '/../models/event_model.php';

function get_all_events() {
    $events = fetch_all_events();
    header('Content-Type: application/json');
    echo json_encode($events);
}

function create_event() {
    if (!isset($_SESSION['user_id'])) {
        http_response_code(401);
        echo json_encode(['error' => 'Unauthorized']);
        return;
    }

    // Allow only captains and admins
    if (!in_array($_SESSION['role'], ['captain', 'admin'])) {
        http_response_code(403);
        echo json_encode(['error' => 'Only captains or admins can create events']);
        return;
    }


    $data = json_decode(file_get_contents('php://input'), true);
    $data['created_by'] = $_SESSION['user_id']; // Set creator

    save_event($data); // Call model function

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
