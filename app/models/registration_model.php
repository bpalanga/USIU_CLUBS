<?php
require_once __DIR__ . '/../../config/database.php';

function save_registration($event_id, $name, $email) {
    global $pdo;
    $stmt = $pdo->prepare("INSERT INTO registrations (event_id, student_name, student_email) VALUES (?, ?, ?)");
    $stmt->execute([$event_id, $name, $email]);
}

function fetch_all_registrations() {
    global $pdo;
    $stmt = $pdo->query("SELECT * FROM registrations");
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

function fetch_registration_by_id($id) {
    global $pdo;
    $stmt = $pdo->prepare("SELECT * FROM registrations WHERE id = ?");
    $stmt->execute([$id]);
    return $stmt->fetch(PDO::FETCH_ASSOC);
}

function delete_registration($id) {
    global $pdo;
    $stmt = $pdo->prepare("DELETE FROM registrations WHERE id = ?");
    $stmt->execute([$id]);
}
