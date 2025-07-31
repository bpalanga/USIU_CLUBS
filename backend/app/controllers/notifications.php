<?php
require_once __DIR__ . '/../models/notification_model.php';

function get_user_notifications() {

    if (!isset($_SESSION['user_id'])) {
        http_response_code(401);
        echo json_encode(['error' => 'Unauthorized']);
        return;
    }

    $user_id = $_SESSION['user_id'];
    $notifications = fetch_notifications_by_user($user_id);

    header('Content-Type: application/json');
    echo json_encode($notifications);
}

function mark_notification_as_read($notification_id) {
    session_start();

    if (!isset($_SESSION['user_id'])) {
        http_response_code(401);
        echo json_encode(['error' => 'Unauthorized']);
        return;
    }

    mark_as_read($notification_id);
    echo json_encode(['message' => 'Notification marked as read']);
}
