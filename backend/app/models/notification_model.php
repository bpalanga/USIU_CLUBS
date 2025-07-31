<?php
require_once __DIR__ . '/../../config/database.php';

function create_notification($recipient_id, $event_id, $message) {
    global $pdo;
    $stmt = $pdo->prepare("INSERT INTO notifications (recipient_id, event_id, message) VALUES (?, ?, ?)");
    $stmt->execute([$recipient_id, $event_id, $message]);
}
function fetch_notifications_by_user($user_id) {
    global $pdo;
    $stmt = $pdo->prepare("SELECT * FROM notifications WHERE recipient_id = ? ORDER BY created_at DESC");
    $stmt->execute([$user_id]);
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

function mark_as_read($notification_id) {
    global $pdo;
    $stmt = $pdo->prepare("UPDATE notifications SET read_status = 1 WHERE id = ?");
    $stmt->execute([$notification_id]);
}
