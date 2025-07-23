<?php
require_once __DIR__ . '/../../config/database.php';

function save_registration($event_id, $name, $email) {
    global $pdo;
    $stmt = $pdo->prepare("INSERT INTO registrations (event_id, student_name, student_email) VALUES (?, ?, ?)");
    $stmt->execute([$event_id, $name, $email]);
}
