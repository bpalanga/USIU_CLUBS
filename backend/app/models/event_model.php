<?php
require_once __DIR__ . '/../../config/database.php';

function fetch_all_events() {
    global $pdo;
    $stmt = $pdo->query("SELECT * FROM events");
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

function save_event($data) {
    global $pdo;
    $stmt = $pdo->prepare("INSERT INTO events (title, category, description, date, time, location) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->execute([$data['title'], data['category'], $data['description'], $data['date'], data['time'], data['location']]);
}

function fetch_event_by_id($id) {
    global $pdo;
    $stmt = $pdo->prepare("SELECT * FROM events WHERE id = ?");
    $stmt->execute([$id]);
    return $stmt->fetch(PDO::FETCH_ASSOC);
}

function update_event($id, $data) {
    global $pdo;
    $stmt = $pdo->prepare("UPDATE events SET title = ?, description = ?, date = ? WHERE id = ?");
    $stmt->execute([$data['title'], data['category'], $data['description'], $data['date'], data['time'], data['location'],$id]);
}

function delete_event($id) {
    global $pdo;
    $stmt = $pdo->prepare("DELETE FROM events WHERE id = ?");
    $stmt->execute([$id]);
}

